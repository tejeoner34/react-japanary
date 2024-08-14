import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { FlashCardModel, Grade } from '@/flash-cards/domain/models/flashCards.model';
import { SpaceRepetition } from '../helpers/spaceRepetition';
import { Deck, DeckModel } from '@/flash-cards/domain/models/deck.model';

export class LocalFlashCardDataSourceImpl implements FlashCardDataSource {
  createFlashCard(flashCard: FlashCardModel): DeckModel[] {
    const decks = this.getDecks();
    const deck = decks.find((deck) => deck.id === flashCard.deckId);

    if (!deck) {
      throw new Error('Deck not found');
    }

    const { allCards, pedingStudyCards } = deck.cards;
    allCards.push(flashCard);
    pedingStudyCards.push(flashCard);
    deck.cards.pendingStudyAmount++;
    deck.cards.totalAmount++;

    localStorage.setItem('decks', JSON.stringify(decks));
    return decks;
  }

  editFlashCard(flashCard: FlashCardModel): DeckModel[] {
    const decks = this.getDecks();
    const deck = decks.find((deck) => deck.id === flashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    const { allCards, pedingStudyCards } = deck.cards;
    const allCardsItem = allCards.findIndex((card) => card.id === flashCard.id);
    const pendingCardsItem = pedingStudyCards.findIndex((card) => card.id === flashCard.id);
    allCards[allCardsItem] = flashCard;
    pedingStudyCards[pendingCardsItem] = flashCard;

    localStorage.setItem('decks', JSON.stringify(decks));
    return decks;
  }

  updateFlashCardRevision(flashCard: FlashCardModel, grade: Grade): void {
    const updatedCard = SpaceRepetition.updateSpaceRepetitionData(flashCard, grade);
    // Tenemos que actualizar el local storage
  }

  getFlashCards(): FlashCardModel[] {
    const storedCards = localStorage.getItem('flashcards');
    return storedCards ? JSON.parse(storedCards) : [];
  }

  deleteFlashCard(flashCard: FlashCardModel): DeckModel[] {
    throw new Error('Method not implemented.');
  }

  getDecks(): DeckModel[] {
    const storedDecks: DeckModel[] = LocalFlashCardDataSourceImpl._getLocalStorageData('decks');
    //Local implementation, in non local implementation it should get the default deck from backend
    if (!storedDecks.length) {
      const defaultDeck = Deck.createDefaultDeck();
      this.createDeck(defaultDeck);
      return [defaultDeck];
    }
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
