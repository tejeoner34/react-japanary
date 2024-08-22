import { Deck, DeckModel } from '../domain/models/deck.model';
import { FlashCard } from '../domain/models/flashCards.model';

export const initialDecks: DeckModel[] = [
  new Deck({
    id: '1',
    name: 'Saludos',
    description: 'Tarjetas de saludo en japonés',
    cards: {
      allCards: [
        new FlashCard({
          id: '1',
          front: 'こんにちは',
          back: 'Hola',
          nextReview: new Date(),
          deckId: 'asdsa',
        }),
        new FlashCard({
          id: '1',
          front: 'こんにちは',
          back: 'Hola',
          nextReview: new Date(),
          deckId: 'asdsa',
        }),
        new FlashCard({
          id: '1',
          front: 'こんにちは',
          back: 'Hola',
          nextReview: new Date(),
          deckId: 'asdsa',
        }),
      ],
      pedingStudyCards: [
        new FlashCard({
          id: '1',
          front: 'こんにちは',
          back: 'Hola',
          nextReview: new Date(),
          deckId: 'asdsa',
        }),
        new FlashCard({
          id: '1',
          front: 'こんにちは',
          back: 'Hola',
          nextReview: new Date(),
          deckId: 'asdsa',
        }),
      ],
      pendingStudyAmount: 2,
      totalAmount: 2,
    },
  }),
  // Más decks aquí
];
