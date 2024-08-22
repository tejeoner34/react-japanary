import { DeckModel } from '../domain/models/deck.model';

export const initialDecks: DeckModel[] = [
  {
    id: '1',
    name: 'Saludos',
    description: 'Tarjetas de saludo en japonés',
    cards: {
      allCards: [
        {
          id: '1',
          front: 'こんにちは',
          back: 'Hola',
          interval: 1,
          repetitions: 0,
          easeFactor: 2.5,
          nextReview: new Date(),
          deckId: 'asdsa',
          updateWithGrade: () => {},
        },
        {
          id: '2',
          front: 'ありがとう',
          back: 'Gracias',
          deckId: 'asda',
          interval: 1,
          repetitions: 0,
          easeFactor: 2.5,
          nextReview: new Date(),
          updateWithGrade: () => {},
        },
        // Más tarjetas aquí
      ],
      pedingStudyCards: [
        {
          id: '1',
          front: 'こんにちは',
          back: 'Hola',
          deckId: 'asda',
          interval: 1,
          repetitions: 0,
          easeFactor: 2.5,
          nextReview: new Date(),
          updateWithGrade: () => {},
        },
        {
          id: '2',
          front: 'ありがとう',
          back: 'Gracias',
          interval: 1,
          repetitions: 0,
          easeFactor: 2.5,
          nextReview: new Date(),
          deckId: 'asda',
          updateWithGrade: () => {},
        },
      ],
      pendingStudyAmount: 2,
      totalAmount: 2,
    },
    addFlashCard: () => {},
    deleteFlashCard: () => {},
    editDeck: () => {},
    setPendingStudyCards: () => {},
    updateFlashCard: () => {},
  },
  // Más decks aquí
];
