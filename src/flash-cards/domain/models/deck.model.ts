import { FlashCard } from './flashCards.model';

export interface Deck {
  id: string;
  name: string;
  description?: string;
  cards: FlashCard[];
}
