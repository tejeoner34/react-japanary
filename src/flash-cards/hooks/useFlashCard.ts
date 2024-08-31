import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FlashCardModel } from '../domain/models/flashCards.model';
import { LocalFlashCardDataSourceImpl } from '../infrastructure/datasource/localFlashCardDataSource.impl';
import { initializeRepository } from '../infrastructure/repositories/flashCardRepository.impl';
import { DeckModel } from '../domain/models/deck.model';
import { FlashCardRepository } from '../domain/repositories/flashCardRepository';
import { useToast } from '@/common/components/ui';
import { FirebaseFlashCardDataSourceImpl } from '../infrastructure/datasource/firebaseFlashCardDataSource.impl';

const defaultRepository = initializeRepository(new FirebaseFlashCardDataSourceImpl());

export function useFlashCard(repository: FlashCardRepository = defaultRepository) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: decks = [],
    isFetching: isLoadingDecks,
    refetch: refetchDecks,
  } = useQuery({
    queryKey: ['decks'],
    queryFn: () => repository.getDecks(),
  });

  const createDeck = useMutation({
    mutationFn: (newDeck: DeckModel) => repository.createDeck(newDeck),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
    },
  });

  const editDeck = useMutation({
    mutationFn: (deck: DeckModel) => repository.editDeck(deck),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
    },
  });

  const deleteDeck = useMutation({
    mutationFn: (deck: DeckModel) => repository.deleteDeck(deck),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
    },
  });

  const createFlashCard = useMutation({
    mutationFn: (newCard: FlashCardModel) => repository.createFlashCard(newCard, decks),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
      toast({ title: 'The card was succesfully created!', variant: 'success' });
    },
  });

  const editFlashCard = useMutation({
    mutationFn: (flashCard: FlashCardModel) => repository.editFlashCard(flashCard),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
    },
  });

  const deleteFlashCard = useMutation({
    mutationFn: (flashCard: FlashCardModel) => repository.deleteFlashCard(flashCard, decks),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
    },
  });

  const updateFlashCardRevision = (flashCard: FlashCardModel) => {
    repository.updateFlashCardRevision(flashCard);
  };

  return {
    createDeck: createDeck.mutate,
    editDeck: editDeck.mutate,
    deleteDeck: deleteDeck.mutate,
    createFlashCard: createFlashCard.mutate,
    editFlashCard: editFlashCard.mutate,
    deleteFlashCard: deleteFlashCard.mutate,
    updateFlashCardRevision,
    refetchDecks,
    decks,
    isLoading: isLoadingDecks,
  };
}

export interface useFlashCardType {
  createDeck: (newDeck: DeckModel) => void;
  editDeck: (deck: DeckModel) => void;
  deleteDeck: (deck: DeckModel) => void;
  createFlashCard: (newCard: FlashCardModel) => void;
  editFlashCard: (flashCard: FlashCardModel) => void;
  updateFlashCardRevision: (flashCard: FlashCardModel) => void;
  deleteFlashCard: (flashCard: FlashCardModel) => void;
  refetchDecks: () => void;
  decks: DeckModel[];
  isLoading: boolean;
}
