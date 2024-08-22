import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { FlashCardModel } from '@/flash-cards/domain/models/flashCards.model';
import { Deck, DeckModel } from '@/flash-cards/domain/models/deck.model';

export class LocalFlashCardDataSourceImpl implements FlashCardDataSource {
  async createFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    // Consider if we do really need to fetch stored decks or we can use local decks and then save changes
    const decks = await this.getDecks();
    const deck = decks.find((deck) => deck.id === flashCard.deckId);

    if (!deck) {
      throw new Error('Deck not found');
    }

    deck.addFlashCard(flashCard);
    localStorage.setItem('decks', JSON.stringify(decks));
    return decks;
  }

  async editFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    const decks = await this.getDecks();
    const deck = decks.find((deck) => deck.id === flashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    deck.updateFlashCard(flashCard);

    localStorage.setItem('decks', JSON.stringify(decks));
    return decks;
  }

  async updateFlashCardRevision(updatedFlashCard: FlashCardModel): Promise<void> {
    // Tenemos que actualizar el local storage
    const decks: DeckModel[] = LocalFlashCardDataSourceImpl._getLocalStorageData('decks').map(
      (deck: DeckModel) => {
        const deckInstance = new Deck(deck);
        deckInstance.setPendingStudyCards();
        return deckInstance;
      }
    );
    const deck = decks.find((deck) => deck.id === updatedFlashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    deck.updateFlashCard(updatedFlashCard);
    localStorage.setItem('decks', JSON.stringify(decks));
  }

  getFlashCards(): Promise<FlashCardModel[]> {
    const storedCards = localStorage.getItem('flashcards');
    return storedCards ? JSON.parse(storedCards) : [];
  }

  async deleteFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    const { deck, decks } = await this._getFlashCardDeckAndDecks(flashCard);
    deck.deleteFlashCard(flashCard);
    localStorage.setItem('decks', JSON.stringify(decks));
    return decks;
  }

  async getDecks(): Promise<DeckModel[]> {
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
      await this.createDeck(defaultDeck);
      return [defaultDeck];
    }
    console.log(storedDecks);
    return storedDecks;
  }

  async createDeck(deck: DeckModel): Promise<DeckModel[]> {
    const storedDecks: DeckModel[] = LocalFlashCardDataSourceImpl._getLocalStorageData('decks');
    storedDecks.push(deck);
    localStorage.setItem('decks', JSON.stringify(storedDecks));
    console.log(storedDecks);
    return storedDecks;
  }

  async editDeck(editedDeck: DeckModel): Promise<DeckModel[]> {
    const storedDecks: DeckModel[] = await this.getDecks();
    const deck = storedDecks.find((storedDeck) => storedDeck.id === editedDeck.id);
    if (!deck) {
      throw new Error('Deck not found');
    }
    deck.editDeck(editedDeck);
    localStorage.setItem('decks', JSON.stringify(storedDecks));
    return storedDecks;
  }

  async deleteDeck(deck: DeckModel): Promise<DeckModel[]> {
    const storedDecks: DeckModel[] = LocalFlashCardDataSourceImpl._getLocalStorageData('decks');
    const filteredDecks = storedDecks.filter((storedDeck) => storedDeck.id !== deck.id);
    localStorage.setItem('decks', JSON.stringify(filteredDecks));
    return filteredDecks;
  }

  static _getLocalStorageData(key: string): any {
    const rawData = localStorage.getItem(key);
    return rawData ? JSON.parse(rawData) : [];
  }

  async _getFlashCardDeckAndDecks(
    flashCard: FlashCardModel
  ): Promise<{ deck: DeckModel; decks: DeckModel[] }> {
    const decks = await this.getDecks();
    const deck = decks.find((deck) => deck.id === flashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    return {
      deck,
      decks,
    };
  }
}
