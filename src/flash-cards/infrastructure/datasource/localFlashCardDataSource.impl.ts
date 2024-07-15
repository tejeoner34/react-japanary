import { FlashCardDataSource } from '@/flash-cards/domain/datasource/flashCardDataSource';
import { FlashCard } from '@/flash-cards/domain/models/flashCards.model';

export class LocalFlashCardDataSourceImpl implements FlashCardDataSource {
  createFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }

  editFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }

  updateFlashCardRevision(flashCard: FlashCard, grade: number): void {
    let { interval, repetitions, easeFactor, nextReview } = flashCard;

    if (grade === 3) {
      // Respuesta fácil
      repetitions += 1;
      interval *= easeFactor;
    } else if (grade === 2) {
      // Respuesta correcta pero difícil
      repetitions += 1;
      interval *= 1;
      easeFactor -= 0.15;
    } else {
      // Respuesta incorrecta
      repetitions = 0;
      interval = 1;
      easeFactor -= 0.3;
    }

    if (easeFactor < 1.3) easeFactor = 1.3;

    nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    // se tiene que actualizar el local storage
    // return { ...flashCard, interval, repetitions, easeFactor, nextReview };
  }

  getFlashCards(): FlashCard[] {
    const storedCards = localStorage.getItem('flashcards');
    return storedCards ? JSON.parse(storedCards) : [];
  }

  deleteFlashCard(flashCard: FlashCard): void {
    throw new Error('Method not implemented.');
  }
}
