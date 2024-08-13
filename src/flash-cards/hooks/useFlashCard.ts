import { useCallback, useEffect, useState } from 'react';
import { FlashCardModel, Grade } from '../domain/models/flashCards.model';
import { LocalFlashCardDataSourceImpl } from '../infrastructure/datasource/localFlashCardDataSource.impl';
import { initializeRepository } from '../infrastructure/repositories/flashCardRepository.impl';
import { DeckModel } from '../domain/models/deck.model';
import { FlashCardRepository } from '../domain/repositories/flashCardRepository';

const defaultRepository = initializeRepository(new LocalFlashCardDataSourceImpl());

export function useFlashCard(repository: FlashCardRepository = defaultRepository) {
  const [decks, setDecks] = useState<DeckModel[]>([]);
  const [flashCards, setFlashCards] = useState<FlashCardModel[]>([]);
  const [currentCard, setCurrentCard] = useState<FlashCardModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getDecks = useCallback(() => {
    setIsLoading(true);
    const storedDecks = repository.getDecks();
    console.log(storedDecks);
    setDecks(storedDecks);
    setIsLoading(false);
  }, [repository]);

  const createDeck = (newDeck: DeckModel) => {
    setIsLoading(true);
    const storedDecks = repository.createDeck(newDeck);
    console.log(storedDecks);
    setDecks(storedDecks);
    setIsLoading(false);
  };

  const deleteDeck = (deck: DeckModel) => {
    setIsLoading(true);
    const storedDecks = repository.deleteDeck(deck);
    setDecks(storedDecks);
    setIsLoading(false);
  };

  const editDeck = (deck: DeckModel) => {
    setIsLoading(true);
    console.log(deck);
    const storedDecks = repository.editDeck(deck);
    setDecks(storedDecks);
    setIsLoading(false);
  };

  const getFlashCards = () => {
    setFlashCards(repository.getFlashCards());
  };

  const createFlashCard = (newCard: FlashCardModel) => {
    setIsLoading(true);
    const updatedDecks = repository.createFlashCard(newCard);
    setDecks(updatedDecks);
    setIsLoading(false);
  };

  const updateFlashCardRevision = (grade: Grade) => {
    if (currentCard) {
      repository.updateFlashCardRevision(currentCard, grade);
    }
  };

  const handleGrade = (grade: Grade) => {
    if (!currentCard) return;
    // TODO : esto está mal. La idea es que el propio método repository.updateFlashCardRevision actualice el local o lo que toque
    const updatedCard = updateFlashCardRevision(grade);
    // const updatedFlashcards = flashCards.map((card) =>
    //   card.id === updatedCard.id ? updatedCard : card
    // );

    // setFlashCards(updatedFlashcards);
    // localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));

    // const nextCard = updatedFlashcards.find((card) => new Date(card.nextReview) <= new Date());
    // setCurrentCard(nextCard || null);
  };

  // useEffect(() => {
  //   getFlashCards();
  // }, []);

  useEffect(() => {
    getDecks();
  }, [getDecks]);

  // useEffect(() => {
  //   const nextCard = flashCards.find((card) => new Date(card.nextReview) <= new Date());
  //   setCurrentCard(nextCard || null);
  // }, [flashCards]);

  return {
    createDeck,
    editDeck,
    deleteDeck,
    getFlashCards,
    createFlashCard,
    handleGrade,
    setFlashCards,
    decks,
    flashCards,
    currentCard,
    isLoading,
  };
}

export interface useFlashCardType {
  createDeck: (newDeck: DeckModel) => void;
  editDeck: (deck: DeckModel) => void;
  deleteDeck: (deck: DeckModel) => void;
  getFlashCards: () => void;
  createFlashCard: (newCard: FlashCardModel) => void;
  handleGrade: (grade: Grade) => void;
  setFlashCards: (flashCards: FlashCardModel[]) => void;
  decks: DeckModel[];
  flashCards: FlashCardModel[];
  currentCard: FlashCardModel | null;
  isLoading: boolean;
}
