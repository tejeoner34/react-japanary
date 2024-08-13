import { createUniqueId } from '@/common/utils';

export interface FlashCardModel {
  id: string;
  front: string;
  back: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReview: Date;
  deckId: string;
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
  constructor({ back, deckId, front }: NewFlashCardProps) {
    this.id = createUniqueId();
    this.back = back;
    this.deckId = deckId;
    this.easeFactor = 2.5;
    this.front = front;
    this.interval = 0;
    this.nextReview = new Date();
    this.repetitions = 0;
  }
}
