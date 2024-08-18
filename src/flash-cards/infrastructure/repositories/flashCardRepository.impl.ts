import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { DeckModel } from '@/flash-cards/domain/models/deck.model';
import { FlashCardModel } from '@/flash-cards/domain/models/flashCards.model';
import { FlashCardRepository } from '@/flash-cards/domain/repositories/flashCardRepository';

export class FlashCardRepositoryImpl implements FlashCardRepository {
  constructor(private flashCardDataSource: FlashCardDataSource) {}
  createFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    return this.flashCardDataSource.createFlashCard(flashCard);
  }
  deleteFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    return this.flashCardDataSource.deleteFlashCard(flashCard);
  }
  editFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    return this.flashCardDataSource.editFlashCard(flashCard);
  }
  getFlashCards(): Promise<FlashCardModel[]> {
    return this.flashCardDataSource.getFlashCards();
  }
  updateFlashCardRevision(flashCard: FlashCardModel): void {
    this.flashCardDataSource.updateFlashCardRevision(flashCard);
  }

  getDecks(): Promise<DeckModel[]> {
    return this.flashCardDataSource.getDecks();
  }

  createDeck(deck: DeckModel): Promise<DeckModel[]> {
    return this.flashCardDataSource.createDeck(deck);
  }

  editDeck(deck: DeckModel): Promise<DeckModel[]> {
    return this.flashCardDataSource.editDeck(deck);
  }

  deleteDeck(deck: DeckModel): Promise<DeckModel[]> {
    return this.flashCardDataSource.deleteDeck(deck);
  }
}

export const initializeRepository = (dataSource: FlashCardDataSource): FlashCardRepositoryImpl =>
  new FlashCardRepositoryImpl(dataSource);
