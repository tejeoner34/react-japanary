import { useContext } from 'react';
import { FlasckCardsContext } from '../context/flashCardsContext';

export function useFlashCardsContext() {
  const context = useContext(FlasckCardsContext);
  if (!context) {
    throw new Error('useFlashCardsContext must be used within a FlashCardsProvider');
  }
  return context;
}
