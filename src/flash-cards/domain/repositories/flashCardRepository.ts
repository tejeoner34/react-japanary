import { DeckModel } from '../models/deck.model';
import { FlashCardModel } from '../models/flashCards.model';

export interface FlashCardRepository {
  createFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]>;
  deleteFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]>;
  editFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]>;
  getFlashCards(): Promise<FlashCardModel[]>;
  updateFlashCardRevision(flashCard: FlashCardModel): void;
  getDecks(): Promise<DeckModel[]>;
  createDeck(deck: DeckModel): Promise<DeckModel[]>;
  editDeck(deck: DeckModel): Promise<DeckModel[]>;
  deleteDeck(deck: DeckModel): Promise<DeckModel[]>;
}
