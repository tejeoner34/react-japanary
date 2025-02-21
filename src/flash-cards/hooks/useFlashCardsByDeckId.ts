import { useQuery } from '@tanstack/react-query';
import { FlashCardModel } from '../domain/models/flashCards.model';
import { FlashCardRepository } from '../domain/repositories/flashCardRepository';
import { initializeRepository } from '../infrastructure/repositories/flashCardRepository.impl';
import { FirebaseFlashCardDataSourceImpl } from '../infrastructure/datasource/firebaseFlashCardDataSource.impl';

const defaultRepository = initializeRepository(new FirebaseFlashCardDataSourceImpl());

export function useFlashCardsByDeckId(
  deckId: string,
  enabled: boolean = true,
  repository: FlashCardRepository = defaultRepository
) {
  const { data: flashCards = [], isFetching } = useQuery<FlashCardModel[]>({
    queryKey: ['flashcards', deckId],
    queryFn: () => repository.getFlashCards(deckId),
    enabled: !!deckId && enabled,
  });
  return {
    flashCards,
    isFetching,
  };
}
