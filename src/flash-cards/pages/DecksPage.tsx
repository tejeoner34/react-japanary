import CustomText from '@/common/components/ui/CustomText';
import { useFlashCard } from '../hooks/useFlashCard';
import { Button } from '@/common/components/ui';
import { Plus } from 'lucide-react';

export default function DecksPage() {
  const { flashCards } = useFlashCard();
  return (
    <>
      <CustomText tag="h1" text="Your decks" />
      <div className="flex justify-end z-100 fixed bottom-0 p-6 w-full">
        <Button className="h-16 w-16" variant="secondaryShadow">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
