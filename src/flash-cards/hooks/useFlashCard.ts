import { useEffect, useState } from 'react';
import { FlashCard, Grade } from '../domain/models/flashCards.model';
import { LocalFlashCardDataSourceImpl } from '../infrastructure/datasource/localFlashCardDataSource.impl';
import { initializeRepository } from '../infrastructure/repositories/flashCardRepository.impl';

const repository = initializeRepository(new LocalFlashCardDataSourceImpl());

export function useFlashCard() {
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [currentCard, setCurrentCard] = useState<FlashCard | null>(null);

  useEffect(() => {
    const storedCards = localStorage.getItem('flashcards');
    if (storedCards) {
      setFlashCards(JSON.parse(storedCards));
    }
  }, []);

  useEffect(() => {
    const nextCard = flashCards.find((card) => new Date(card.nextReview) <= new Date());
    setCurrentCard(nextCard || null);
  }, [flashCards]);

  const getFlashCards = () => {
    return repository.getFlashCards();
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

  return {
    getFlashCards,
    handleGrade,
    setFlashCards,
    flashCards,
    currentCard,
  };
}
