import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { DeckModel } from '@/flash-cards/domain/models/deck.model';
import { FlashCardModel, Image } from '@/flash-cards/domain/models/flashCards.model';
import { FlashCardRepository } from '@/flash-cards/domain/repositories/flashCardRepository';

export class FlashCardRepositoryImpl implements FlashCardRepository {
  constructor(private flashCardDataSource: FlashCardDataSource) {}
  async uploadImages(images: File[]): Promise<Image[]> {
    return await this.flashCardDataSource.uploadImages(images);
  }
  async setDefaultDeck(deckId: string, decks: DeckModel[]): Promise<DeckModel[]> {
    return this.flashCardDataSource.setDefaultDeck(deckId, decks);
  }
  async sincronizeDeck(deck: DeckModel): Promise<void> {
    return this.flashCardDataSource.sincronizeDeck(deck);
  }
  createFlashCard(flashCard: FlashCardModel, decks: DeckModel[]): Promise<DeckModel[]> {
    return this.flashCardDataSource.createFlashCard(flashCard, decks);
  }
  deleteFlashCard(flashCard: FlashCardModel, decks: DeckModel[]): Promise<DeckModel[]> {
    return this.flashCardDataSource.deleteFlashCard(flashCard, decks);
  }
  editFlashCard(flashCard: FlashCardModel, decks: DeckModel[]): Promise<DeckModel[]> {
    return this.flashCardDataSource.editFlashCard(flashCard, decks);
  }
  getFlashCards(deckId: string): Promise<FlashCardModel[]> {
    return this.flashCardDataSource.getFlashCards(deckId);
  }
  updateFlashCardRevision(flashCard: FlashCardModel, decks: DeckModel[]): void {
    this.flashCardDataSource.updateFlashCardRevision(flashCard, decks);
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
