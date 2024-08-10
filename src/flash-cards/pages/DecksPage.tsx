import CustomText from '@/common/components/ui/CustomText';
import { useFlashCard } from '../hooks/useFlashCard';
import { Button } from '@/common/components/ui';
import { Folders, CreditCard, Plus } from 'lucide-react';
import CustomDropdownMenu from '@/common/components/ui/CustomDropdownMenu';

const dropdownMenuItems = [
  {
    name: 'Create new deck',
    icon: <Folders className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Create new flash card',
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
];

export default function DecksPage() {
  const { flashCards } = useFlashCard();
  return (
    <>
      <CustomText tag="h1" text="Your decks" />

      <div className="flex justify-end z-100 fixed bottom-0 p-6 w-full">
        <CustomDropdownMenu items={dropdownMenuItems}>
          <Button className="h-16 w-16" variant="secondaryShadow">
            <Plus className="h-5 w-5" />
          </Button>
        </CustomDropdownMenu>
      </div>
    </>
  );
}
