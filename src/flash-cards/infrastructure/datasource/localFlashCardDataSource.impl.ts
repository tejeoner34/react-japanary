import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { FlashCardModel, Grade } from '@/flash-cards/domain/models/flashCards.model';
import { SpaceRepetition } from '../helpers/spaceRepetition';
import { Deck, DeckModel } from '@/flash-cards/domain/models/deck.model';

export class LocalFlashCardDataSourceImpl implements FlashCardDataSource {
  createFlashCard(flashCard: FlashCardModel): DeckModel[] {
    // Consider if we do really need to fetch stored decks or we can use local decks and then save changes
    const decks = this.getDecks();
    const deck = decks.find((deck) => deck.id === flashCard.deckId);

    if (!deck) {
      throw new Error('Deck not found');
    }

    deck.addFlashCard(flashCard);
    localStorage.setItem('decks', JSON.stringify(decks));
    return decks;
  }

  editFlashCard(flashCard: FlashCardModel): DeckModel[] {
    const decks = this.getDecks();
    const deck = decks.find((deck) => deck.id === flashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    deck.updateFlashCard(flashCard);

    localStorage.setItem('decks', JSON.stringify(decks));
    return decks;
  }

  updateFlashCardRevision(updatedFlashCard: FlashCardModel): void {
    // Tenemos que actualizar el local storage
    const decks = this.getDecks();
    const deck = decks.find((deck) => deck.id === updatedFlashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    deck.updateFlashCard(updatedFlashCard);
    localStorage.setItem('decks', JSON.stringify(decks));
  }

  getFlashCards(): FlashCardModel[] {
    const storedCards = localStorage.getItem('flashcards');
    return storedCards ? JSON.parse(storedCards) : [];
  }

  deleteFlashCard(flashCard: FlashCardModel): DeckModel[] {
    throw new Error('Method not implemented.');
  }

  getDecks(): DeckModel[] {
    const storedDecks: DeckModel[] = LocalFlashCardDataSourceImpl._getLocalStorageData('decks').map(
      (deck: DeckModel) => {
        const deckInstance = new Deck(deck);
        deckInstance.setPendingStudyCards();
        return deckInstance;
      }
    );
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

  editDeck(editedDeck: DeckModel): DeckModel[] {
    const storedDecks: DeckModel[] = this.getDecks();
    const deck = storedDecks.find((storedDeck) => storedDeck.id === editedDeck.id);
    if (!deck) {
      throw new Error('Deck not found');
    }
    deck.editDeck(editedDeck);
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
