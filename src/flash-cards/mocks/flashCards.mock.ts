import { DeckModel } from '../domain/models/deck.model';

export const initialDecks: DeckModel[] = [
  {
    id: '1',
    name: 'Saludos',
    description: 'Tarjetas de saludo en japonés',
    cards: [
      {
        id: '1',
        question: 'こんにちは',
        answer: 'Hola',
        interval: 1,
        repetitions: 0,
        easeFactor: 2.5,
        nextReview: new Date(),
      },
      {
        id: '2',
        question: 'ありがとう',
        answer: 'Gracias',
        interval: 1,
        repetitions: 0,
        easeFactor: 2.5,
        nextReview: new Date(),
      },
      // Más tarjetas aquí
    ],
  },
  // Más decks aquí
];
