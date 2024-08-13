import { useState } from 'react';
import {
  Button,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/common/components/ui';
import { DeckModel } from '@/flash-cards/domain/models/deck.model';
import { FlashCard } from '@/flash-cards/domain/models/flashCards.model';

interface FlashCardFormProps {
  availableDecks: DeckModel[];
  flashCardToEdit?: FlashCard;
  isVisible: boolean;
  mode?: 'create' | 'edit';
  onCloseVisibility: () => void;
  onSubmit: (deck: DeckModel) => void;
}

export default function FlashCardForm({
  availableDecks,
  flashCardToEdit,
  isVisible,
  mode = 'create',
  onCloseVisibility,
  onSubmit,
}: FlashCardFormProps) {
  const [form, setForm] = useState({
    front: '',
    back: '',
    belongsToDeck: {},
  });

  const isValidForm = form.front.trim() !== '';

  const handleInputChange = () => {};
  const handleSumbit = (ev: React.FormEvent) => {
    // ev.preventDefault();
    // if (!isValidForm) return;
    // onSubmit(
    //   new Deck({
    //     name: form.name,
    //     description: form.description,
    //     cards: deck?.cards,
    //     id: deck?.id,
    //   })
    // );
    onCloseVisibility();
  };

  const titleText = mode === 'create' ? 'New Card' : 'Edit Card';

  return (
    <Dialog
      open={isVisible}
      onOpenChange={() => {
        onCloseVisibility();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSumbit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="front" className="text-right">
                Front
              </Label>
              <Input
                className="col-span-3"
                defaultValue={flashCardToEdit?.front}
                name="front"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="back" className="text-right">
                Back
              </Label>
              <Input
                className="col-span-3"
                defaultValue={flashCardToEdit?.back}
                name="back"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!isValidForm}>
              Create Deck
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
