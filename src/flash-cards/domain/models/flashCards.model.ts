export interface FlashCard {
  id: string;
  front: string;
  back: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReview: Date;
}

export interface FlashCardsData {
  totalAmount: number;
  pendingStudyAmount: number;
  allCards: FlashCard[];
  pedingStudyCards: FlashCard[];
}

export enum Grade {
  Again = 0,
  Hard = 1,
  Medium = 2,
  Easy = 3,
}
