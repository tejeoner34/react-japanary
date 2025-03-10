import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FlashCardModel, Image } from '../domain/models/flashCards.model';
import { initializeRepository } from '../infrastructure/repositories/flashCardRepository.impl';
import { DeckModel } from '../domain/models/deck.model';
import { FlashCardRepository } from '../domain/repositories/flashCardRepository';
import { useToast } from '@/common/components/ui';
import { FirebaseFlashCardDataSourceImpl } from '../infrastructure/datasource/firebaseFlashCardDataSource.impl';
import { useEffect, useState } from 'react';
import { useAuth } from '@/auth/hooks/useAuth';

const defaultRepository = initializeRepository(new FirebaseFlashCardDataSourceImpl());
const variant = 'destructive';

export function useFlashCard(repository: FlashCardRepository = defaultRepository) {
  const { isUserLogged } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [uploadImagesUrl, setUploadedImgagesUrl] = useState<Image[]>([]);

  const {
    data: decks = [],
    isFetching: isLoadingDecks,
    refetch: refetchDecks,
    isError: isDecksError,
  } = useQuery({
    queryKey: ['decks'],
    queryFn: () => repository.getDecks(),
    enabled: isUserLogged,
  });

  const createDeck = useMutation({
    mutationFn: (newDeck: DeckModel) => repository.createDeck(newDeck),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
    },
    onError: () => {
      toast({
        title: 'Error creating deck',
        variant,
      });
    },
  });

  const editDeck = useMutation({
    mutationFn: (deck: DeckModel) => repository.editDeck(deck),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
    },
    onError: () => {
      toast({
        title: 'Error editing deck',
        variant,
      });
    },
  });

  const deleteDeck = useMutation({
    mutationFn: (deck: DeckModel) => repository.deleteDeck(deck),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
    },
    onError: () => {
      toast({
        title: 'Error deleting deck',
        variant,
      });
    },
  });

  const createFlashCard = useMutation({
    mutationFn: (newCard: FlashCardModel) => {
      setUploadedImgagesUrl([]);
      return repository.createFlashCard(newCard, decks);
    },
    onSuccess: () => {
      toast({ title: 'The card was successfully created!', variant: 'success' });
    },
    onError: () => {
      console.log('creating error in hoo');

      toast({
        title: 'Error creating flash card',
        variant,
      });
    },
  });

  const uploadImages = useMutation({
    mutationFn: (images: File[]) => repository.uploadImages(images),
    onSuccess: (images) => {
      setUploadedImgagesUrl(images);
      toast({ title: 'The card was successfully created!', variant: 'success' });
    },
    onError: () => {
      toast({
        title: 'Error uploading images',
        variant,
      });
    },
  });

  const editFlashCard = useMutation({
    mutationFn: (flashCard: FlashCardModel) => repository.editFlashCard(flashCard, decks),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
    },
    onError: () => {
      toast({
        title: 'Error editing flash card',
        variant,
      });
    },
  });

  const deleteFlashCard = useMutation({
    mutationFn: (flashCard: FlashCardModel) => repository.deleteFlashCard(flashCard, decks),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
    },
    onError: () => {
      toast({
        title: 'Error deleting flash card',
        variant,
      });
    },
  });

  const setDefaultDeck = useMutation({
    mutationFn: (deckId: string) => repository.setDefaultDeck(deckId, decks),
    onSuccess: (updatedDecks) => {
      queryClient.setQueryData<DeckModel[]>(['decks'], () => updatedDecks);
    },
    onError: () => {
      toast({
        title: 'Error setting default deck',
        variant,
      });
    },
  });

  const updateFlashCardRevision = (flashCard: FlashCardModel) => {
    try {
      repository.updateFlashCardRevision(flashCard, decks);
    } catch {
      toast({
        title: 'Error updating flash card revision',
        variant,
      });
    }
  };

  const sincronizeDeck = useMutation({
    mutationFn: (deck: DeckModel) => repository.sincronizeDeck(deck),
    onError: () => {
      toast({
        title: 'Error synchronizing deck',
        variant,
      });
    },
  });

  const getDefaultDeck = () => decks.find((deck) => deck.isDefault) || decks[0];

  useEffect(() => {
    if (isDecksError) {
      toast({
        title: 'Error fetching decks',
        variant,
      });
    }
  }, [isDecksError, toast]);

  return {
    createDeck: createDeck.mutate,
    editDeck: editDeck.mutate,
    deleteDeck: deleteDeck.mutate,
    createFlashCard: createFlashCard.mutate,
    editFlashCard: editFlashCard.mutate,
    deleteFlashCard: deleteFlashCard.mutate,
    uploadImages: uploadImages.mutate,
    updateFlashCardRevision,
    sincronizeDeck: sincronizeDeck.mutate,
    refetchDecks,
    getDefaultDeck,
    setDefaultDeck: setDefaultDeck.mutate,
    decks,
    isLoading: isLoadingDecks,
    isEditDeckLoading: sincronizeDeck.isPending,
    uploadImagesUrl,
  };
}

export interface useFlashCardType {
  createDeck: (newDeck: DeckModel) => void;
  editDeck: (deck: DeckModel) => void;
  deleteDeck: (deck: DeckModel) => void;
  createFlashCard: (newCard: FlashCardModel) => void;
  editFlashCard: (flashCard: FlashCardModel) => void;
  updateFlashCardRevision: (flashCard: FlashCardModel) => void;
  uploadImages: (images: File[]) => void;
  sincronizeDeck(deck: DeckModel): void;
  deleteFlashCard: (flashCard: FlashCardModel) => void;
  refetchDecks: () => void;
  getDefaultDeck: () => DeckModel;
  setDefaultDeck: (deckId: string) => void;
  decks: DeckModel[];
  isLoading: boolean;
  isEditDeckLoading: boolean;
  uploadImagesUrl: Image[];
}
