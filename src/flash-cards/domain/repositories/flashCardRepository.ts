import { DeckModel } from '../models/deck.model';
import { FlashCardModel, Image } from '../models/flashCards.model';

export interface FlashCardRepository {
  createFlashCard(flashCard: FlashCardModel, decks: DeckModel[]): Promise<DeckModel[]>;
  deleteFlashCard(flashCard: FlashCardModel, decks: DeckModel[]): Promise<DeckModel[]>;
  editFlashCard(flashCard: FlashCardModel, decks: DeckModel[]): Promise<DeckModel[]>;
  getFlashCards(deckId: string): Promise<FlashCardModel[]>;
  updateFlashCardRevision(flashCard: FlashCardModel, decks: DeckModel[]): void;
  sincronizeDeck(deck: DeckModel): Promise<void>;
  getDecks(): Promise<DeckModel[]>;
  createDeck(deck: DeckModel): Promise<DeckModel[]>;
  editDeck(deck: DeckModel): Promise<DeckModel[]>;
  deleteDeck(deck: DeckModel): Promise<DeckModel[]>;
  setDefaultDeck(deckId: string, decks: DeckModel[]): Promise<DeckModel[]>;
  uploadImages(images: File[]): Promise<Image[]>;
}
