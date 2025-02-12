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
  arrayUnion,
} from '@/auth/config/firebase';
import { arrayRemove, runTransaction } from 'firebase/firestore';
import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { Deck, DeckModel } from '@/flash-cards/domain/models/deck.model';
import { FlashCardModel, Image } from '@/flash-cards/domain/models/flashCards.model';
import { LocalFlashCardDataSourceImpl } from './localFlashCardDataSource.impl';
import {
  createDeckInstance,
  createDeckModel,
  flashcardAdapter,
} from '@/flash-cards/utils/firebase';

const BASE_URL: string = import.meta.env.VITE_DICTIONARY_BASE_URL + 'flashcard';

const localImplementation = new LocalFlashCardDataSourceImpl();

export class FirebaseFlashCardDataSourceImpl implements FlashCardDataSource {
  async createFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    try {
      const deckRef = doc(this._getDecksCollection(), flashCard.deckId);
      await updateDoc(deckRef, {
        'cards.allCards': arrayUnion(flashcardAdapter(flashCard)),
      });
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
      deck.deleteFlashCard(flashCard);
      const deckModelFirebase = createDeckModel(deck);
      const deckRef = doc(this._getDecksCollection(), deck.id!);
      await updateDoc(deckRef, deckModelFirebase);
      return localDecks;
    } catch (error) {
      throw new Error('Something went wrong while deleting the flashcard');
    }
  }

  async editFlashCard(flashCard: FlashCardModel, localDecks: DeckModel[]): Promise<DeckModel[]> {
    const deck = localDecks.find((deck) => deck.id === flashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    try {
      deck.updateFlashCard(flashCard);
      const deckModelFirebase = createDeckModel(deck);
      const deckRef = doc(this._getDecksCollection(), deck.id!);
      await updateDoc(deckRef, deckModelFirebase);
      return localDecks;
    } catch (error) {
      throw new Error('Something went wrong while deleting the flashcard');
    }
  }
  getFlashCards(): Promise<FlashCardModel[]> {
    throw new Error('Method not implemented.');
  }

  async updateFlashCardRevision(updatedFlashCard: FlashCardModel, decks: DeckModel[]) {
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

      const cardsToUpdate = JSON.parse(cardsToUpdateRaw);
      if (!cardsToUpdate || deck.id !== cardsToUpdate.deckId) return;

      const deckRef = doc(this._getDecksCollection(), deck.id!);

      await runTransaction(db, async (transaction) => {
        const deckSnapshot = await transaction.get(deckRef);
        if (!deckSnapshot.exists()) return;

        const deckData = deckSnapshot.data();
        const allCards: FlashCardModel[] = deckData.cards?.allCards || [];

        const outdatedCards = allCards.filter((existingCard) =>
          cardsToUpdate.cards.some(
            (updatedCard: FlashCardModel) => updatedCard.id === existingCard.id
          )
        );

        transaction.update(deckRef, {
          'cards.allCards': arrayRemove(...outdatedCards),
        });

        transaction.update(deckRef, {
          'cards.allCards': arrayUnion(...cardsToUpdate.cards),
        });
      });

      localStorage.removeItem('cardsToUpdate');
    } catch (error) {
      console.error('Error synchronizing decks:', error);
      throw new Error('An error occurred while synchronizing decks.');
    }
  }

  async getDecks(): Promise<DeckModel[]> {
    try {
      const decks: DeckModel[] = createDeckInstance(await this._getDecksRawDecks());
      localStorage.setItem('decks', JSON.stringify(decks));
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
      const newDockRef = await addDoc(deckCollection, { ...deck });
      deck.addId(newDockRef.id);
      const updatedLocalDecks = createDeckInstance(await localImplementation.createDeck(deck));
      return updatedLocalDecks;
    } catch (error) {
      throw new Error('Error creating deck');
    }
  }

  async editDeck(editedDeck: DeckModel): Promise<DeckModel[]> {
    try {
      const currentUserId = auth.currentUser?.uid;
      if (!currentUserId) {
        throw new Error('User not logged in');
      }
      const deckRef = doc(db, 'users', currentUserId, 'decks', editedDeck.id!);
      await updateDoc(deckRef, { ...editedDeck });
      const updateLocalDecks = createDeckInstance(await localImplementation.editDeck(editedDeck));
      return updateLocalDecks;
    } catch (error) {
      throw new Error('Something went wrong while editing the deck');
    }
  }

  async deleteDeck(deck: DeckModel): Promise<DeckModel[]> {
    const deckCollection = this._getDecksCollection();
    try {
      const deckRef = doc(deckCollection, deck.id!);
      await deleteDoc(deckRef);
      const updatedLocalDecks = createDeckInstance(await localImplementation.deleteDeck(deck));
      return updatedLocalDecks;
    } catch (error) {
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
      const decksCollectionRef = collection(userRef, 'decks');
      const q = query(decksCollectionRef);
      const querySnapshot = await getDocs(q);
      if (querySnapshot.metadata.fromCache) {
        throw new Error('Error retrieving decks');
      }
      const rawDecks: DeckModel[] = querySnapshot.docs.map((doc) => {
        // Access the ID from the document object
        const deckId = doc.id;
        const deckData = doc.data() as DeckModel;

        // Combine the ID and data into a single object
        return {
          ...deckData, // Spread operator to include existing deck data
          id: deckId,
        };
      });
      return rawDecks;
    } catch (err) {
      console.log(err);
      throw new Error('Error retrieving decks');
    }
  }

  _getDecksCollection() {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) {
      throw new Error('User not logged in');
    }
    const userRef = doc(db, 'users', currentUserId);
    const decksCollectionRef = collection(userRef, 'decks');
    return decksCollectionRef;
  }
}
