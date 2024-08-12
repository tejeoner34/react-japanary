import { useState } from 'react';
import { useFlashCardsContext } from '../hooks/useFlashCardsContext';
import CustomText from '@/common/components/ui/CustomText';
import { Button } from '@/common/components/ui';
import { Folders, CreditCard, Plus } from 'lucide-react';
import CustomDropdownMenu from '@/common/components/ui/CustomDropdownMenu';
import { DeckForm } from '../components/ui/DeckForm';
import DeckItem from '../components/ui/DeckItem';

export default function DecksPage() {
  const [isDeckFormVisible, setIsDeckFormVisible] = useState(false);
  const { decks, createDeck } = useFlashCardsContext();
  const dropdownMenuItems = [
    {
      name: 'Create new deck',
      icon: <Folders className="mr-2 h-4 w-4" />,
      action: () => setIsDeckFormVisible(true),
    },
    {
      name: 'Create new flash card',
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      action: () => {},
    },
  ];
  return (
    <>
      <CustomText tag="h1" text="Your decks" />

      <div className="flex flex-col gap-3 w-full">
        {decks.map((deck) => (
          <DeckItem deck={deck} key={deck.id} />
        ))}
      </div>

      <div className="flex justify-end z-100 fixed bottom-0 p-6 w-full">
        <CustomDropdownMenu items={dropdownMenuItems}>
          <Button className="h-16 w-16" variant="secondaryShadow">
            <Plus className="h-5 w-5" />
          </Button>
        </CustomDropdownMenu>
      </div>

      <DeckForm
        isVisible={isDeckFormVisible}
        onCloseVisibility={() => setIsDeckFormVisible(false)}
        onSubmit={createDeck}
      />
    </>
  );
}
