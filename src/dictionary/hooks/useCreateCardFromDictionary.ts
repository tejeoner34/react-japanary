import { useState } from 'react';
import { FlashCard, FlashCardModel } from '@/flash-cards/domain/models/flashCards.model';
import { useFlashCardsContext } from '@/flash-cards/hooks/useFlashCardsContext';
import { SearchResult } from '../models/searchResult';

export function useCreateCardFromDictionary(wordData: SearchResult) {
  const { decks, createFlashCard } = useFlashCardsContext();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newCardData, setNewCardData] = useState({} as FlashCard);

  const openForm = () => {
    const meaningsArray = wordData.senses.map((sense) => sense.englishDefinitions.join(', '));
    const meaningsArrayToString = meaningsArray.join(', ');
    const newCard = new FlashCard({
      front: wordData.slug,
      back: meaningsArrayToString,
      deckId: decks[0].id,
    });
    setNewCardData(newCard);
    setIsFormVisible(true);
  };

  const handleCreateFlashCard = (newFlashCard: FlashCardModel) => {
    createFlashCard(newFlashCard);
    setNewCardData({} as FlashCard);
    setIsFormVisible(false);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setNewCardData({} as FlashCard);
  };

  return {
    isFormVisible,
    newCardData,
    openForm,
    handleCreateFlashCard,
    closeForm,
    decks,
  };
}
