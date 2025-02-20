import { useEffect, useState } from 'react';
import { useFlashCardsContext } from '../hooks/useFlashCardsContext';
import CustomText from '@/common/components/ui/CustomText';
import { Button } from '@/common/components/ui';
import { Folders, CreditCard, Plus } from 'lucide-react';
import CustomDropdownMenu from '@/common/components/ui/CustomDropdownMenu';
import { DeckForm } from '../components/ui/DeckForm';
import DeckItem from '../components/ui/DeckItem';
import FlashCardForm from '../components/ui/FlashCardForm';
import { Spinner } from '@/common/components/ui/Spinner';
import { DeckModel } from '../domain/models/deck.model';
import { useLocation, useNavigate } from 'react-router-dom';
import MigrationButton from '../components/ui/MigrateButton';

export default function DecksPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDeckFormVisible, setIsDeckFormVisible] = useState(false);
  const [isFlashCardFormVisible, setIsFlashCardFormVisible] = useState(false);
  const { isLoading, decks, createDeck, editDeck, deleteDeck, createFlashCard, refetchDecks } =
    useFlashCardsContext();

  const handleNavigation = (deck: DeckModel) => {
    if (deck.cards.pendingStudyAmount === 0) return;
    navigate(`/decks/study/${deck.id}`);
  };
  const dropdownMenuItems = [
    {
      name: 'Create new flash card',
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      action: () => setIsFlashCardFormVisible(true),
    },
    {
      name: 'Create new deck',
      icon: <Folders className="mr-2 h-4 w-4" />,
      action: () => setIsDeckFormVisible(true),
    },
  ];

  useEffect(() => {
    if (location.pathname === '/decks') {
      refetchDecks();
    }
  }, [location.pathname, refetchDecks]);
  if (isLoading) {
    return <Spinner size="large" />;
  }
  return (
    <>
      <CustomText tag="h1" text="Your decks" />
      <MigrationButton />

      <div className="flex flex-col gap-3 w-full max-w-3xl">
        {decks.map((deck) => (
          <DeckItem
            deck={deck}
            key={deck.id}
            onClick={handleNavigation}
            onDelete={deleteDeck}
            onEdit={editDeck}
          />
        ))}
      </div>

      <div className="flex justify-end z-100 fixed bottom-0 p-9 w-full">
        <CustomDropdownMenu items={dropdownMenuItems}>
          <Button className="h-16 w-16" variant="secondaryShadow">
            <Plus className="h-5 w-5" />
          </Button>
        </CustomDropdownMenu>
      </div>

      {!isLoading && decks.length && (
        <>
          <DeckForm
            isVisible={isDeckFormVisible}
            onCloseVisibility={() => setIsDeckFormVisible(false)}
            onSubmit={createDeck}
          />
          <FlashCardForm
            availableDecks={decks}
            isVisible={isFlashCardFormVisible}
            onCloseVisibility={() => setIsFlashCardFormVisible(false)}
            onSubmit={createFlashCard}
          />
        </>
      )}
    </>
  );
}
