import { FlashCard, Grade } from '../models/flashCards.model';

export interface FlashCardRepository {
  createFlashCard(flashCard: FlashCard): void;
  deleteFlashCard(flashCard: FlashCard): void;
  editFlashCard(flashCard: FlashCard): void;
  getFlashCards(): FlashCard[];
  updateFlashCardRevision(flashCard: FlashCard, grade: Grade): void;
}
