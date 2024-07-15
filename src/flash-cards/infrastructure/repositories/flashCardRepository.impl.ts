import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { FlashCard } from '@/flash-cards/domain/models/flashCards.model';
import { FlashCardRepository } from '@/flash-cards/domain/repositories/flashCardRepository';

export class FlashCardRepositoryImpl implements FlashCardRepository {
  constructor(private flashCardDataSource: FlashCardDataSource) {}
  createFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }
  deleteFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }
  editFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }
  getFlashCards(): FlashCard[] {
    return this.flashCardDataSource.getFlashCards();
  }
  updateFlashCardRevision(flashCard: FlashCard, grade: number): void {
    throw new Error('Method not implemented.');
  }
}
