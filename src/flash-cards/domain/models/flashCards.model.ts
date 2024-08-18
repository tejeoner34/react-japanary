import { createUniqueId } from '@/common/utils';
import { SpaceRepetition } from '@/flash-cards/infrastructure/helpers/spaceRepetition';

export interface FlashCardModel {
  id: string;
  front: string;
  back: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReview: Date;
  deckId: string;
  updateWithGrade: (grade: Grade) => void;
}

export interface FlashCardsData {
  totalAmount: number;
  pendingStudyAmount: number;
  allCards: FlashCardModel[];
  pedingStudyCards: FlashCardModel[];
}

export enum Grade {
  Again = 0,
  Hard = 1,
  Medium = 2,
  Easy = 3,
}

interface NewFlashCardProps {
  front: string;
  back: string;
  deckId: string;
  id?: string;
  nextReview?: Date;
}

export class FlashCard implements FlashCardModel {
  id: string;
  front: string;
  back: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReview: Date;
  deckId: string;
  constructor({ back, deckId, front, id, nextReview }: NewFlashCardProps) {
    this.id = id || createUniqueId();
    this.back = back;
    this.deckId = deckId;
    this.easeFactor = 2.5;
    this.front = front;
    this.interval = 0;
    this.nextReview = nextReview || new Date();
    this.repetitions = 0;
  }

  updateWithGrade(grade: Grade): void {
    console.log(this);
    const updatedCard = SpaceRepetition.updateSpaceRepetitionData(this, grade);
    this.interval = updatedCard.interval;
    this.repetitions = updatedCard.repetitions;
    this.easeFactor = updatedCard.easeFactor;
    this.nextReview = updatedCard.nextReview;
    console.log(this);
  }

  static updateWithGrade(card: FlashCardModel, grade: Grade): FlashCardModel {
    return SpaceRepetition.updateSpaceRepetitionData(card, grade);
  }
}
