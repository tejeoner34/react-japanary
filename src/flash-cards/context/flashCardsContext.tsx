import { createContext, ReactNode } from 'react';
import { useFlashCard, useFlashCardType } from '../hooks/useFlashCard';

interface FlashCardsProviderProps {
  children: ReactNode;
}

export const FlasckCardsContext = createContext<useFlashCardType | null>(null);

export const FlashCardsContextProvider: React.FC<FlashCardsProviderProps> = ({ children }) => {
  const flashCardsHook = useFlashCard();
  return (
    <FlasckCardsContext.Provider value={flashCardsHook}>{children}</FlasckCardsContext.Provider>
  );
};
