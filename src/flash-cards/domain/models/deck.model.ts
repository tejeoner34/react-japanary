import { FlashCardModel, FlashCardsData, Grade } from './flashCards.model';

interface NewDeckConfig {
  name: string;
  description?: string;
  cards?: FlashCardsData;
  id?: string | null;
  isDefault?: boolean;
}

export interface DeckModel {
  id?: string | null;
  name: string;
  description?: string;
  cards: FlashCardsData;
  isDefault?: boolean;
  addId: (id: string) => void;
  addFlashCard(flashCard: FlashCardModel): void;
  updateFlashCard(flashCard: FlashCardModel): void;
  editDeck(editedDeck: DeckModel): void;
  setPendingStudyCards(): void;
  deleteFlashCard(flashCard: FlashCardModel): void;
}

export class Deck implements DeckModel {
  id: string | null;
  name: string;
  description: string;
  cards: FlashCardsData;
  isDefault?: boolean;

  constructor({ name, description, cards, id, isDefault = false }: NewDeckConfig) {
    this.id = id || null;
    this.name = name;
    this.cards = cards || {
      allCards: [],
      pedingStudyCards: [],
      pendingStudyAmount: 0,
      totalAmount: 0,
    };
    this.description = description || '';
    this.isDefault = isDefault;
  }

  static createDefaultDeck(): DeckModel {
    return new Deck({
      name: 'Default',
      description: 'This is a default deck, you can modify or create new ones',
    });
  }

  addId(id: string) {
    this.id = id;
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

  deleteFlashCard(flashCard: FlashCardModel) {
    const { id } = flashCard;
    this.cards.allCards = this.cards.allCards.filter((card) => card.id !== id);
    this.cards.pedingStudyCards = this.cards.pedingStudyCards.filter((card) => card.id !== id);
    this.cards.pendingStudyAmount--;
    this.cards.totalAmount--;
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

    // Actualizar el mazo de pending (eliminar o mantener)
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
