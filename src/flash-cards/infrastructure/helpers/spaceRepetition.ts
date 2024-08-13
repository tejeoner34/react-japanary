import { FlashCardModel, Grade } from '@/flash-cards/domain/models/flashCards.model';

// We encapsulate the logic of the Space Repetition system in one place as it will be
// used in different data source implementations.
export class SpaceRepetition {
  static updateSpaceRepetitionData(flashCard: FlashCardModel, grade: Grade): FlashCardModel {
    let { interval, repetitions, easeFactor, nextReview } = flashCard;

    // Update logic based on the grade provided
    switch (grade) {
      case Grade.Easy:
        repetitions += 1;
        interval = interval > 0 ? Math.round(interval * easeFactor) : 1;
        easeFactor += 0.1; // Increase ease factor slightly
        break;

      case Grade.Medium:
        repetitions += 1;
        interval = interval > 0 ? interval : 1; // Keep the same interval
        easeFactor -= 0.15; // Decrease ease factor slightly
        break;

      case Grade.Hard:
        repetitions += 1;
        interval = 1; // Review the next day
        easeFactor -= 0.3; // Decrease ease factor more significantly
        break;

      case Grade.Again:
      default:
        repetitions = 0; // Reset repetitions
        interval = 1; // Review the next day
        easeFactor -= 0.15; // Decrease ease factor slightly
        break;
    }

    // Ensure easeFactor does not drop below 1.3
    if (easeFactor < 1.3) easeFactor = 1.3;

    // Calculate the next review date based on the interval
    nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    // Return the updated flashCard with new SRS data
    return { ...flashCard, interval, repetitions, easeFactor, nextReview };
  }
}
