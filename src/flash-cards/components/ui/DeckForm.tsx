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
import { Deck } from '@/flash-cards/domain/models/deck.model';
import { useId, useState } from 'react';

interface DeckFormProps {
  isVisible: boolean;
  onCloseVisibility: () => void;
  onSubmit: (newDeck: Deck) => void;
}

export function DeckForm({ isVisible, onCloseVisibility, onSubmit }: DeckFormProps) {
  const deckId = useId();
  const [form, setForm] = useState({
    name: '',
    description: '',
  });
  const isValidForm = form.name.trim() !== '';

  const handleSumbit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!isValidForm) return;
    console.log(form);
    const newDeck: Deck = {
      cards: [],
      description: form.description,
      id: deckId,
      name: form.name,
    };
    onSubmit(newDeck);
    onCloseVisibility();
  };

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Dialog
      open={isVisible}
      onOpenChange={() => {
        onCloseVisibility();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Deck</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSumbit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                placeholder="Kanji level..."
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripton
              </Label>
              <Input
                name="description"
                placeholder="This deck is used for..."
                className="col-span-3"
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
