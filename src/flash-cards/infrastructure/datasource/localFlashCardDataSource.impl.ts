import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { FlashCard, Grade } from '@/flash-cards/domain/models/flashCards.model';
import { SpaceRepetition } from '../helpers/spaceRepetition';
import { DeckModel } from '@/flash-cards/domain/models/deck.model';

export class LocalFlashCardDataSourceImpl implements FlashCardDataSource {
  createFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }

  editFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }

  updateFlashCardRevision(flashCard: FlashCard, grade: Grade): void {
    const updatedCard = SpaceRepetition.updateSpaceRepetitionData(flashCard, grade);
    // Tenemos que actualizar el local storage
  }

  getFlashCards(): FlashCard[] {
    const storedCards = localStorage.getItem('flashcards');
    return storedCards ? JSON.parse(storedCards) : [];
  }

  deleteFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }

  getDecks(): DeckModel[] {
    const storedDecks: DeckModel[] = LocalFlashCardDataSourceImpl._getLocalStorageData('decks');
    return storedDecks;
  }

  createDeck(deck: DeckModel): DeckModel[] {
    const storedDecks: DeckModel[] = LocalFlashCardDataSourceImpl._getLocalStorageData('decks');
    storedDecks.push(deck);
    localStorage.setItem('decks', JSON.stringify(storedDecks));
    console.log(storedDecks);
    return storedDecks;
  }

  editDeck(deck: DeckModel): DeckModel[] {
    const storedDecks: DeckModel[] = LocalFlashCardDataSourceImpl._getLocalStorageData('decks');
    const foundIndex = storedDecks.findIndex((storedDeck) => storedDeck.id === deck.id);
    if (foundIndex === -1) {
      throw new Error('Deck not found');
    }
    storedDecks[foundIndex] = deck;
    localStorage.setItem('decks', JSON.stringify(storedDecks));
    return storedDecks;
  }

  deleteDeck(deck: DeckModel): DeckModel[] {
    const storedDecks: DeckModel[] = LocalFlashCardDataSourceImpl._getLocalStorageData('decks');
    const filteredDecks = storedDecks.filter((storedDeck) => storedDeck.id !== deck.id);
    localStorage.setItem('decks', JSON.stringify(filteredDecks));
    return filteredDecks;
  }

  static _getLocalStorageData(key: string): any {
    const rawData = localStorage.getItem(key);
    return rawData ? JSON.parse(rawData) : [];
  }
}
