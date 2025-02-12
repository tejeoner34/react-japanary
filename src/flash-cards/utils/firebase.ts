import { DeckModel, Deck } from '../domain/models/deck.model';
import { FlashCardModel } from '../domain/models/flashCards.model';

export const createDeckInstance = (rawDecks: DeckModel[]) => {
  return rawDecks.map((deck: DeckModel) => {
    const deckInstance = new Deck(deck);
    deckInstance.addId(deck.id || '');
    deckInstance.setPendingStudyCards();
    return deckInstance;
  });
};

export const createDeckModel = (deck: DeckModel) => {
  const deckModel = {
    id: deck.id,
    name: deck.name,
    description: deck.description,
    cards: {
      allCards: deck.cards.allCards.map(flashcardAdapter),
      pedingStudyCards: deck.cards.pedingStudyCards.map(flashcardAdapter),
      pendingStudyAmount: deck.cards.pendingStudyAmount,
      totalAmount: deck.cards.totalAmount,
    },
  };
  return deckModel;
};

export const flashcardAdapter = (flashcard: FlashCardModel) => {
  return {
    id: flashcard.id || null,
    front: flashcard.front,
    back: flashcard.back,
    interval: flashcard.interval,
    repetitions: flashcard.repetitions,
    easeFactor: flashcard.easeFactor,
    nextReview:
      flashcard.nextReview instanceof Date
        ? flashcard.nextReview.toISOString()
        : flashcard.nextReview,
    deckId: flashcard.deckId,
    imagesUrl:
      flashcard.imagesUrl?.map((image) => ({
        id: image.id,
        url: image.url,
      })) || [],
  };
};
