import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomText from '@/common/components/ui/CustomText';
import { Spinner } from '@/common/components/ui/Spinner';
import { useDictionaryContext } from '../hooks/useDictionaryContext';
import Form from '../components/Form';
import { useFlashCardsContext } from '@/flash-cards/hooks/useFlashCardsContext';
import FlashCardForm from '@/flash-cards/components/ui/FlashCardForm';
import { FlashCard } from '@/flash-cards/domain/models/flashCards.model';

export default function MeaningScreen() {
  const navigate = useNavigate();
  const { query } = useParams();

  const { searchMeaning, meaningResult, isMeaningLoading } = useDictionaryContext();

  const { decks, createFlashCard, getDefaultDeck } = useFlashCardsContext();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newCard, setNewCard] = useState<FlashCard | null>(null);

  useEffect(() => {
    if (query) {
      searchMeaning(query);
    }
  }, [query, searchMeaning]);

  const handleSearch = (word: string) => {
    navigate(`/dictionary/meaning/${word}`);
  };

  const openForm = () => {
    if (!query || !meaningResult) return;
    const card = new FlashCard({
      front: query,
      back: meaningResult,
      deckId: getDefaultDeck()?.id || decks[0]?.id || '',
    });
    setNewCard(card);
    setIsFormVisible(true);
  };

  const handleCreate = (card: FlashCard) => {
    createFlashCard(card);
    setIsFormVisible(false);
  };

  return (
    <>
      <div className="z-100 fixed bottom-0 right-0 left-0 p-5 bg-backgroundSecondary max-w-md w-full md:relative md:p-0">
        <Form onSubmit={handleSearch} hasDeleteAction />
      </div>

      <div className="flex flex-col gap-3">
        {!meaningResult && !isMeaningLoading && (
          <>
            <CustomText
              tag="h1"
              styles="text-4xl font-bold text-center"
              text="日本語の意味を見る"
            />
            <CustomText
              styles="text-center"
              text="Ask the AI for the meaning in Japanese. Ex: おはようございます"
            />
          </>
        )}
      </div>

      {isMeaningLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="large">
            <p className="mt-4">Fetching meaning...</p>
          </Spinner>
        </div>
      )}

      {meaningResult && !isMeaningLoading && (
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <CustomText tag="h2" styles="text-xl font-semibold" text="Result" />
            <button
              onClick={openForm}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Create Flashcard
            </button>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p>{meaningResult}</p>
          </div>
        </div>
      )}

      {isFormVisible && newCard && (
        <FlashCardForm
          isVisible={isFormVisible}
          onCloseVisibility={() => setIsFormVisible(false)}
          onSubmit={handleCreate}
          availableDecks={decks}
          flashCardToEdit={newCard}
        />
      )}
    </>
  );
}
