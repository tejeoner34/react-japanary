import { DeckModel } from '../models/deck.model';
import { FlashCardModel } from '../models/flashCards.model';

export interface FlashCardDataSource {
  createFlashCard(flashCard: FlashCardModel, decks: DeckModel[]): Promise<DeckModel[]>;
  deleteFlashCard(flashCard: FlashCardModel, decks: DeckModel[]): Promise<DeckModel[]>;
  editFlashCard(flashCard: FlashCardModel, decks: DeckModel[]): Promise<DeckModel[]>;
  getFlashCards(): Promise<FlashCardModel[]>;
  updateFlashCardRevision(flashCard: FlashCardModel, decks: DeckModel[]): void;
  sincronizeDeck(deck: DeckModel): void;
  getDecks(): Promise<DeckModel[]>;
  createDeck(deck: DeckModel): Promise<DeckModel[]>;
  editDeck(deck: DeckModel): Promise<DeckModel[]>;
  deleteDeck(deck: DeckModel): Promise<DeckModel[]>;
}
