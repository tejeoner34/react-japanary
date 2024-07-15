import { FlashCard, Grade } from '@/flash-cards/domain/models/flashCards.model';

// We encapsulate the logic of Space Repetition system in one place as it will be
// used in different data source implementations
export class SpaceRepetition {
  static updateSpaceRepetitionData(flashCard: FlashCard, grade: Grade): FlashCard {
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

    return { ...flashCard, interval, repetitions, easeFactor, nextReview };
  }
}
