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
  createFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    throw new Error('Method not implemented.');
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
      const rawDecks: DeckModel[] = await this._getDecksRawDecks();

      const instantiatedDecks: DeckModel[] = rawDecks.map((deck: DeckModel) => {
        const deckInstance = new Deck(deck);
        deckInstance.setPendingStudyCards();
        return deckInstance;
      });

      if (!instantiatedDecks.length) {
        const defaultDeck = Deck.createDefaultDeck();
        await this.createDeck(defaultDeck);
        return [defaultDeck];
      }

      console.log('storeddecks', instantiatedDecks);
      return instantiatedDecks;
    } catch (error) {
      throw new Error('An error occurred while retrieving decks.');
    }
  }

  async createDeck(deck: DeckModel): Promise<DeckModel[]> {
    const deckCollection = this._getDecksCollection();
    try {
      const newDockRef = await addDoc(deckCollection, { ...deck });
      deck.addId(newDockRef.id);
      const updatedLocalDecks = await localImplementation.createDeck(deck);
      return updatedLocalDecks;
    } catch (error) {
      throw new Error('Error creating deck');
    }
  }

  async editDeck(editedDeck: DeckModel): Promise<DeckModel[]> {
    const updateLocalDecks = await localImplementation.editDeck(editedDeck);
    try {
      const currentUserId = auth.currentUser?.uid;
      if (!currentUserId) {
        throw new Error('User not logged in');
      }
      const deckRef = doc(db, 'users', currentUserId, 'decks', editedDeck.id);
      await updateDoc(deckRef, { ...editedDeck });
      return updateLocalDecks;
    } catch (error) {
      throw new Error('Something went wrong while editing the deck');
    }
  }

  async deleteDeck(deck: DeckModel): Promise<DeckModel[]> {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) {
      throw new Error('User not logged in');
    }
    const deckRef = doc(db, 'users', currentUserId, 'decks', deck.id);
    try {
      await deleteDoc(deckRef);
      const updatedLocalDecks = await localImplementation.deleteDeck(deck);
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
    const rawDecks: DeckModel[] = querySnapshot.docs.map((doc) => doc.data() as DeckModel);
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
}
