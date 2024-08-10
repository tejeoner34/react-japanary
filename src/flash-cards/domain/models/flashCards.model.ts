export interface FlashCard {
  id: string;
  question: string;
  answer: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReview: Date;
}

export enum Grade {
  Again = 0,
  Hard = 1,
  Medium = 2,
  Easy = 3,
}
