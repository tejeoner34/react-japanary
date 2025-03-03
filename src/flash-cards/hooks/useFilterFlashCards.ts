import { useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { FlashCardModel } from '../domain/models/flashCards.model';

export function useFilterFlashCards(flashCards: FlashCardModel[] = [], debounceDelay = 300) {
  const [filterValue, setFilterValue] = useState('');

  const debouncedSetFilterValue = useMemo(
    () =>
      debounce((value: string) => {
        setFilterValue(value);
      }, debounceDelay),
    [debounceDelay]
  );

  const filteredCards = useMemo(() => {
    if (!filterValue) return flashCards;
    return flashCards.filter(
      (card) =>
        card.front.toLowerCase().includes(filterValue.toLowerCase()) ||
        card.back.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [flashCards, filterValue]);

  return {
    filteredCards,
    onFilter: debouncedSetFilterValue,
  };
}
