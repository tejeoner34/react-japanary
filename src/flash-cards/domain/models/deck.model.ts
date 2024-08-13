import { createUniqueId } from '@/common/utils';
import { FlashCardsData } from './flashCards.model';

export interface DeckModel {
  id: string;
  name: string;
  description?: string;
  cards: FlashCardsData;
}

interface NewDeckConfig {
  name: string;
  description?: string;
  cards?: FlashCardsData;
  id?: string;
}

export class Deck implements DeckModel {
  id: string;
  name: string;
  description?: string;
  cards: FlashCardsData;

  constructor({ name, description, cards, id }: NewDeckConfig) {
    this.id = id || createUniqueId();
    this.name = name;
    this.cards = cards || {
      allCards: [],
      pedingStudyCards: [],
      pendingStudyAmount: 0,
      totalAmount: 0,
    };
    this.description = description;
  }
}
