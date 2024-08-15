import { FlashCardModel, Grade } from '@/flash-cards/domain/models/flashCards.model';

// We encapsulate the logic of the Space Repetition system in one place as it will be
// used in different data source implementations.
export class SpaceRepetition {
  static updateSpaceRepetitionData(flashCard: FlashCardModel, grade: Grade): FlashCardModel {
    let { interval, repetitions, easeFactor, nextReview } = flashCard;

    // Update logic based on the grade provided
    switch (grade) {
      case Grade.Again:
        repetitions = 0;
        interval = 0; // La tarjeta se revisa en la misma sesión.
        easeFactor = Math.max(1.3, easeFactor - 0.2);
        break;
      case Grade.Hard:
        repetitions += 1;
        interval = 1; // Revisión al día siguiente.
        easeFactor = Math.max(1.3, easeFactor - 0.15);
        break;
      case Grade.Medium:
        repetitions += 1;
        interval = interval > 0 ? Math.round(interval * easeFactor) : 2; // Revisión en 2 días si es la primera vez.
        break;
      case Grade.Easy:
        repetitions += 1;
        interval = interval > 0 ? Math.round(interval * easeFactor * 1.5) : 4; // Revisión en 4 días si es la primera vez.
        easeFactor += 0.15;
        break;
    }
    nextReview = new Date();
    if (interval > 0) {
      nextReview.setDate(nextReview.getDate() + interval);
    }

    // Return the updated flashCard with new SRS data
    return { ...flashCard, interval, repetitions, easeFactor, nextReview };
  }
}
