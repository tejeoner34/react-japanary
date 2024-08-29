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
import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { Deck, DeckModel } from '@/flash-cards/domain/models/deck.model';
import { FlashCardModel } from '@/flash-cards/domain/models/flashCards.model';
import { LocalFlashCardDataSourceImpl } from './localFlashCardDataSource.impl';

const localImplementation = new LocalFlashCardDataSourceImpl();

export class FirebaseFlashCardDataSourceImpl implements FlashCardDataSource {
  async createFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    const localDecks = this._createDeckInstance(await localImplementation.getDecks());
    const deck = localDecks.find((deck) => deck.id === flashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }

    try {
      deck.addFlashCard(flashCard);
      // Update the deck data in Firestore
      const deckRef = doc(this._getDecksCollection(), deck.id);
      await updateDoc(deckRef, { ...deck });
      return localDecks;
    } catch (error) {
      console.error('Error creating flashcard:', error);
      throw new Error('Something went wrong while creating the flashcard');
    }
  }

  deleteFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    throw new Error('Method not implemented.');
  }
  editFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    throw new Error('Method not implemented.');
  }
  getFlashCards(): Promise<FlashCardModel[]> {
    throw new Error('Method not implemented.');
  }
  updateFlashCardRevision(flashCard: FlashCardModel): void {
    throw new Error('Method not implemented.');
  }
  async getDecks(): Promise<DeckModel[]> {
    try {
      const decks: DeckModel[] = this._createDeckInstance(await this._getDecksRawDecks());
      localStorage.setItem('decks', JSON.stringify(decks));

      if (!decks.length) {
        const defaultDeck = Deck.createDefaultDeck();
        const updatedLocalDecks = await this.createDeck(defaultDeck);
        return updatedLocalDecks;
      }

      console.log('storeddecks', decks);
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
      const updatedLocalDecks = this._createDeckInstance(
        await localImplementation.createDeck(deck)
      );
      console.log(updatedLocalDecks);
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
      const updateLocalDecks = this._createDeckInstance(
        await localImplementation.editDeck(editedDeck)
      );
      return updateLocalDecks;
    } catch (error) {
      console.log('errrorororroo');
      throw new Error('Something went wrong while editing the deck');
    }
  }

  async deleteDeck(deck: DeckModel): Promise<DeckModel[]> {
    const deckCollection = this._getDecksCollection();
    try {
      const deckRef = doc(deckCollection, deck.id!);
      await deleteDoc(deckRef);
      const updatedLocalDecks = this._createDeckInstance(
        await localImplementation.deleteDeck(deck)
      );
      console.log(updatedLocalDecks);
      return updatedLocalDecks;
    } catch (error) {
      throw new Error('Something went wrong while deleting the deck');
    }
  }

  async _getDecksRawDecks(): Promise<DeckModel[]> {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) {
      throw new Error('User not logged in');
    }
    const userRef = doc(db, 'users', currentUserId);
    const decksCollectionRef = collection(userRef, 'decks');
    const q = query(decksCollectionRef);
    const querySnapshot = await getDocs(q);
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

  _createDeckInstance(rawDecks: DeckModel[]) {
    return rawDecks.map((deck: DeckModel) => {
      const deckInstance = new Deck(deck);
      deckInstance.addId(deck.id || '');
      deckInstance.setPendingStudyCards();
      return deckInstance;
    });
  }
}
