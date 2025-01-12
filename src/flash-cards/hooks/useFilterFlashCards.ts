import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { FlashCardModel } from '../domain/models/flashCards.model';

export function useFilterFlashCards(flashCards: FlashCardModel[] = [], debounceDelay = 1000) {
  const [filteredCards, setFilteredCards] = useState<FlashCardModel[]>([]);

  const onFilter = debounce((filterValue: string) => {
    setFilteredCards(
      flashCards.filter(
        (card) =>
          card.front.toLowerCase().includes(filterValue.toLowerCase()) ||
          card.back.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  }, debounceDelay);

  useEffect(() => {
    setFilteredCards(flashCards);
  }, [flashCards]);

  return {
    onFilter,
    filteredCards,
  };
}
