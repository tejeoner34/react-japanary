import { DeckModel } from '../models/deck.model';
import { FlashCard, Grade } from '../models/flashCards.model';

export interface FlashCardDataSource {
  createFlashCard(flashCard: FlashCard): void;
  deleteFlashCard(flashCard: FlashCard): void;
  editFlashCard(flashCard: FlashCard): void;
  getFlashCards(): FlashCard[];
  updateFlashCardRevision(flashCard: FlashCard, grade: Grade): void;
  getDecks(): DeckModel[];
  createDeck(deck: DeckModel): DeckModel[];
  editDeck(deck: DeckModel): DeckModel[];
  deleteDeck(deck: DeckModel): DeckModel[];
}
