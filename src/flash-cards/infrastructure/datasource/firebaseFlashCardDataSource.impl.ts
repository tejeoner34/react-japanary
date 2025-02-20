import axios from 'axios';
import {
  auth,
  db,
  doc,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
} from '@/auth/config/firebase';
import { where, writeBatch } from 'firebase/firestore';
import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { Deck, DeckModel } from '@/flash-cards/domain/models/deck.model';
import { FlashCardModel, Image } from '@/flash-cards/domain/models/flashCards.model';
import { LocalFlashCardDataSourceImpl } from './localFlashCardDataSource.impl';
import { createDeckInstance, flashcardAdapter } from '@/flash-cards/utils/firebase';

const COLLECTIONS = {
  USERS: 'users',
  DECKS: 'decks',
  FLASHCARDS: 'flashcards',
};

const BASE_URL: string = import.meta.env.VITE_DICTIONARY_BASE_URL + 'flashcard';

const localImplementation = new LocalFlashCardDataSourceImpl();

export class FirebaseFlashCardDataSourceImpl implements FlashCardDataSource {
  async createFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    try {
      const allCardsCollectionRef = collection(
        this._getDeckDocRef(flashCard.deckId),
        COLLECTIONS.FLASHCARDS
      );
      await addDoc(allCardsCollectionRef, flashcardAdapter(flashCard));
      return [];
    } catch (error) {
      console.error('Error creating flashcard:', error);
      throw new Error('Something went wrong while creating the flashcard');
    }
  }

  async deleteFlashCard(flashCard: FlashCardModel, localDecks: DeckModel[]): Promise<DeckModel[]> {
    const deck = localDecks.find((deck) => deck.id === flashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    try {
      const cardRef = doc(
        this._getDeckDocRef(flashCard.deckId),
        COLLECTIONS.FLASHCARDS,
        flashCard.id
      );
      await deleteDoc(cardRef);
      deck.deleteFlashCard(flashCard);
      return localDecks;
    } catch (error) {
      console.error('Error deleting flashcard:', error);
      throw new Error('Something went wrong while deleting the flashcard');
    }
  }

  async editFlashCard(flashCard: FlashCardModel, localDecks: DeckModel[]): Promise<DeckModel[]> {
    const deck = localDecks.find((deck) => deck.id === flashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    try {
      const cardRef = doc(
        this._getDeckDocRef(flashCard.deckId),
        COLLECTIONS.FLASHCARDS,
        flashCard.id
      );
      await updateDoc(cardRef, { ...flashCard });
      deck.updateFlashCard(flashCard);
      return localDecks;
    } catch (error) {
      console.error('Error editing flashcard:', error);
      throw new Error('Something went wrong while editing the flashcard');
    }
  }

  async getFlashCards(deckId: string): Promise<FlashCardModel[]> {
    try {
      const flashcardsCollectionRef = collection(
        db,
        COLLECTIONS.USERS,
        auth.currentUser!.uid,
        COLLECTIONS.DECKS,
        deckId,
        COLLECTIONS.FLASHCARDS
      );

      const flashcardsSnapshot = await getDocs(flashcardsCollectionRef);

      const flashcards: FlashCardModel[] = flashcardsSnapshot.docs.map((doc) => {
        const data = doc.data() as FlashCardModel;
        return { ...data, id: doc.id };
      });

      return flashcards;
    } catch (error) {
      console.error('Error fetching flashcards for deck:', deckId, error);
      throw new Error('Failed to fetch flashcards');
    }
  }

  updateFlashCardRevision(updatedFlashCard: FlashCardModel, decks: DeckModel[]) {
    const deck = decks.find((deck) => deck.id === updatedFlashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    try {
      const cardsToUpdateRaw = localStorage.getItem('cardsToUpdate');
      const cardsToUpdate = cardsToUpdateRaw
        ? JSON.parse(cardsToUpdateRaw)
        : {
            deckId: deck.id,
            cards: [],
          };
      if (deck.id === cardsToUpdate.deckId) {
        cardsToUpdate.cards.push(updatedFlashCard);
        localStorage.setItem('cardsToUpdate', JSON.stringify(cardsToUpdate));
      }
    } catch (error) {
      throw new Error('Something went wrong while deleting the flashcard');
    }
  }

  async sincronizeDeck(deck: DeckModel): Promise<void> {
    try {
      const cardsToUpdateRaw = localStorage.getItem('cardsToUpdate');
      if (!cardsToUpdateRaw) return;

      const cardsToUpdate = JSON.parse(cardsToUpdateRaw) as {
        deckId: string;
        cards: FlashCardModel[];
      };

      if (!cardsToUpdate || deck.id !== cardsToUpdate.deckId) return;

      const flashcardsCollectionRef = collection(
        doc(this._getDecksCollection(), deck.id!),
        COLLECTIONS.FLASHCARDS
      );
      const batch = writeBatch(db);

      for (const updatedCard of cardsToUpdate.cards) {
        const cardRef = doc(flashcardsCollectionRef, updatedCard.id);
        batch.update(cardRef, {
          interval: updatedCard.interval,
          repetitions: updatedCard.repetitions,
          easeFactor: updatedCard.easeFactor,
          nextReview: updatedCard.nextReview,
        });
      }

      await batch.commit();

      localStorage.removeItem('cardsToUpdate');
    } catch (error) {
      console.error('Error synchronizing deck flashcards:', error);
      throw new Error('An error occurred while synchronizing deck flashcards.');
    }
  }

  async getDecks(): Promise<DeckModel[]> {
    try {
      const decks: DeckModel[] = createDeckInstance(await this._getDecksRawDecks());
      console.log('decks', decks);
      localStorage.setItem(COLLECTIONS.DECKS, JSON.stringify(decks));
      localStorage.removeItem('cardsToUpdate');

      if (!decks.length) {
        const defaultDeck = Deck.createDefaultDeck();
        const updatedLocalDecks = await this.createDeck(defaultDeck);
        return updatedLocalDecks;
      }
      return decks;
    } catch (error) {
      throw new Error('An error occurred while retrieving decks.');
    }
  }

  async createDeck(deck: DeckModel): Promise<DeckModel[]> {
    const deckCollection = this._getDecksCollection();
    try {
      const newDeckRef = await addDoc(deckCollection, {
        name: deck.name,
        description: deck.description,
        isDefault: deck.isDefault,
      });
      deck.addId(newDeckRef.id);
      const updatedLocalDecks = createDeckInstance(await localImplementation.createDeck(deck));
      return updatedLocalDecks;
    } catch (error) {
      console.error('Error creating deck:', error);
      throw new Error('Error creating deck');
    }
  }

  async editDeck(editedDeck: DeckModel): Promise<DeckModel[]> {
    try {
      const deckRef = this._getDeckDocRef(editedDeck.id!);

      // Exclude nested fields like 'cards' when updating the deck itself
      const { cards, ...deckWithoutCards } = editedDeck;

      await updateDoc(deckRef, { ...deckWithoutCards });

      const updatedLocalDecks = createDeckInstance(await localImplementation.editDeck(editedDeck));
      return updatedLocalDecks;
    } catch (error) {
      console.error('Error editing deck:', error);
      throw new Error('Something went wrong while editing the deck');
    }
  }

  async deleteDeck(deck: DeckModel): Promise<DeckModel[]> {
    try {
      const deckRef = doc(this._getDecksCollection(), deck.id!);
      await deleteDoc(deckRef);
      const updatedLocalDecks = createDeckInstance(await localImplementation.deleteDeck(deck));
      return updatedLocalDecks;
    } catch (error) {
      console.error('Error deleting deck:', error);
      throw new Error('Something went wrong while deleting the deck');
    }
  }

  async setDefaultDeck(newDefaultDeckId: string, decks: DeckModel[]): Promise<DeckModel[]> {
    try {
      const currentDefaultDeck = decks.find((deck) => deck.isDefault);
      const newDefaultDeck = decks.find((deck) => deck.id === newDefaultDeckId);

      if (!newDefaultDeck) {
        throw new Error('Deck not found');
      }

      if (currentDefaultDeck) {
        currentDefaultDeck.isDefault = false;
      }
      newDefaultDeck.isDefault = true;

      const updates = [];
      if (currentDefaultDeck) {
        const currentDefaultDeckRef = doc(this._getDecksCollection(), currentDefaultDeck.id!);
        updates.push(updateDoc(currentDefaultDeckRef, { isDefault: false }));
      }
      const newDefaultDeckRef = doc(this._getDecksCollection(), newDefaultDeck.id!);
      updates.push(updateDoc(newDefaultDeckRef, { isDefault: true }));

      await Promise.all(updates);

      return decks;
    } catch (error) {
      console.error('Error setting default deck:', error);
      throw new Error('Something went wrong while setting the default deck');
    }
  }

  async uploadImages(images: File[]): Promise<Image[]> {
    try {
      console.log('Uploading images...', images);
      const formData = new FormData();
      images.forEach((image) => {
        formData.append(`images`, image);
      });
      const response = await axios.post(BASE_URL + '/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error('Error uploading images');
    }
  }

  async _getDecksRawDecks(): Promise<DeckModel[]> {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) {
      throw new Error('User not logged in');
    }

    try {
      const userRef = doc(db, 'users', currentUserId);
      const decksCollectionRef = collection(userRef, COLLECTIONS.DECKS);
      const decksQuerySnapshot = await getDocs(decksCollectionRef);

      if (decksQuerySnapshot.metadata.fromCache) {
        throw new Error('Error retrieving decks');
      }

      const decks = decksQuerySnapshot.docs.map((deckDoc) => ({
        id: deckDoc.id,
        data: deckDoc.data() as DeckModel,
        ref: deckDoc.ref,
      }));

      const today = new Date().toISOString();

      const flashcardFetchPromises = decks.map(({ ref, id }) => {
        const flashcardsCollectionRef = collection(ref, COLLECTIONS.FLASHCARDS);
        const pendingCardsQuery = query(flashcardsCollectionRef, where('nextReview', '<=', today));
        return getDocs(pendingCardsQuery).then((snapshot) => ({
          deckId: id,
          pendingCards: snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as FlashCardModel[],
        }));
      });

      const pendingCardsResults = await Promise.all(flashcardFetchPromises);

      const decksWithCards: DeckModel[] = decks.map(({ id, data }) => {
        const pendingCardsResult = pendingCardsResults.find((result) => result.deckId === id);
        return {
          ...data,
          id,
          cards: {
            pedingStudyCards: pendingCardsResult?.pendingCards || [],
            pendingStudyAmount: pendingCardsResult?.pendingCards.length || 0,
          },
        };
      });

      return decksWithCards;
    } catch (err) {
      console.error('Error retrieving decks and flashcards:', err);
      throw new Error('Error retrieving decks');
    }
  }

  private _getDecksCollection() {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) {
      throw new Error('User not logged in');
    }
    const userRef = doc(db, 'users', currentUserId);
    const decksCollectionRef = collection(userRef, COLLECTIONS.DECKS);
    return decksCollectionRef;
  }

  private _getDeckDocRef(deckId: string) {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) {
      throw new Error('User not logged in');
    }
    return doc(db, 'users', currentUserId, COLLECTIONS.DECKS, deckId);
  }
}
