import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { FlashCard, Grade } from '@/flash-cards/domain/models/flashCards.model';
import { SpaceRepetition } from '../helpers/spaceRepetition';
import { Deck } from '@/flash-cards/domain/models/deck.model';

export class LocalFlashCardDataSourceImpl implements FlashCardDataSource {
  createFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }

  editFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }

  updateFlashCardRevision(flashCard: FlashCard, grade: Grade): void {
    const updatedCard = SpaceRepetition.updateSpaceRepetitionData(flashCard, grade);
    // Tenemos que actualizar el local storage
  }

  getFlashCards(): FlashCard[] {
    const storedCards = localStorage.getItem('flashcards');
    return storedCards ? JSON.parse(storedCards) : [];
  }

  deleteFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }

  createDeck(deck: Deck): Deck[] {
    throw new Error('Method not implemented.');
  }

  editDeck(deck: Deck): Deck[] {
    throw new Error('Method not implemented.');
  }

  deleteDeck(deck: Deck): Deck[] {
    throw new Error('Method not implemented.');
  }
}
