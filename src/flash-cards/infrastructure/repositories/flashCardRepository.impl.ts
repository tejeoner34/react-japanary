import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { DeckModel } from '@/flash-cards/domain/models/deck.model';
import { FlashCard, Grade } from '@/flash-cards/domain/models/flashCards.model';
import { FlashCardRepository } from '@/flash-cards/domain/repositories/flashCardRepository';

export class FlashCardRepositoryImpl implements FlashCardRepository {
  constructor(private flashCardDataSource: FlashCardDataSource) {}
  createFlashCard(flashCard: FlashCard): void {
    this.flashCardDataSource.createFlashCard(flashCard);
  }
  deleteFlashCard(flashCard: FlashCard): void {
    this.flashCardDataSource.deleteFlashCard(flashCard);
  }
  editFlashCard(flashCard: FlashCard): void {
    this.flashCardDataSource.editFlashCard(flashCard);
  }
  getFlashCards(): FlashCard[] {
    return this.flashCardDataSource.getFlashCards();
  }
  updateFlashCardRevision(flashCard: FlashCard, grade: Grade): void {
    this.flashCardDataSource.updateFlashCardRevision(flashCard, grade);
  }

  getDecks(): DeckModel[] {
    return this.flashCardDataSource.getDecks();
  }

  createDeck(deck: DeckModel): DeckModel[] {
    return this.flashCardDataSource.createDeck(deck);
  }

  editDeck(deck: DeckModel): DeckModel[] {
    return this.flashCardDataSource.editDeck(deck);
  }

  deleteDeck(deck: DeckModel): DeckModel[] {
    return this.flashCardDataSource.deleteDeck(deck);
  }
}

export const initializeRepository = (dataSource: FlashCardDataSource): FlashCardRepositoryImpl =>
  new FlashCardRepositoryImpl(dataSource);
