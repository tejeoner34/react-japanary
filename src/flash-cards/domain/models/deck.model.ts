import { createUniqueId } from '@/common/utils';
import { FlashCardModel, FlashCardsData, Grade } from './flashCards.model';

export interface DeckModel {
  id: string;
  name: string;
  description?: string;
  cards: FlashCardsData;
  addFlashCard(flashCard: FlashCardModel): void;
  updateFlashCard(flashCard: FlashCardModel): void;
  editDeck(editedDeck: DeckModel): void;
  setPendingStudyCards(): void;
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
  description: string;
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
    this.description = description || '';
  }

  static createDefaultDeck(): DeckModel {
    return new Deck({
      name: 'Default',
      description: 'This is a default deck, you can modify or create new ones',
    });
  }

  addFlashCard(flashCard: FlashCardModel): void {
    this.cards.allCards.push(flashCard);
    this.cards.pedingStudyCards.push(flashCard);
    this.cards.pendingStudyAmount++;
    this.cards.totalAmount++;
  }

  updateFlashCard(flashCard: FlashCardModel): void {
    const allCardsIndex = this.cards.allCards.findIndex((card) => card.id === flashCard.id);
    const pendingCardsIndex = this.cards.pedingStudyCards.findIndex(
      (card) => card.id === flashCard.id
    );

    if (allCardsIndex !== -1) this.cards.allCards[allCardsIndex] = flashCard;
    if (pendingCardsIndex !== -1) this.cards.pedingStudyCards[pendingCardsIndex] = flashCard;
  }

  editDeck(deck: DeckModel): void {
    this.name = deck.name;
    this.description = deck.description || '';
  }

  evaluateCard(cardId: string, grade: Grade): void {
    const card = this.cards.allCards.find((card) => card.id === cardId);

    if (!card) {
      throw new Error('Card not found in the deck');
    }

    card.updateWithGrade(grade);

    // tenemos que actualizar el mazo de pending (eliminar o mantener)
    // if (card.nextReview > new Date()) {
    //   this.cards.pendingStudyCards = this.cards.pendingStudyCards.filter((c) => c.id !== cardId);
    //   this.cards.pendingStudyAmount--;
    // }

    // Guardar el estado del deck actualizado en almacenamiento persistente
  }

  getPendingStudyCards(): FlashCardModel[] {
    const now = new Date().setHours(0, 0, 0, 0);

    return this.cards.allCards.filter((card) => {
      const cardReviewDate = new Date(card.nextReview).setHours(0, 0, 0, 0);
      return cardReviewDate <= now;
    });
  }

  setPendingStudyCards() {
    this.cards.pedingStudyCards = this.getPendingStudyCards();
    this.cards.pendingStudyAmount = this.cards.pedingStudyCards.length;
  }
}
