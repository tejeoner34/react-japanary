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
  Easy = 3,
  Hard = 1,
  Medium = 2,
}
