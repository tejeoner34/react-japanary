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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui';
import { DeckModel } from '@/flash-cards/domain/models/deck.model';
import { FlashCard, FlashCardModel } from '@/flash-cards/domain/models/flashCards.model';

interface FlashCardFormProps {
  availableDecks: DeckModel[];
  flashCardToEdit?: FlashCardModel;
  isVisible: boolean;
  mode?: 'create' | 'edit';
  onCloseVisibility: () => void;
  onSubmit: (deck: FlashCardModel) => void;
}

export default function FlashCardForm({
  availableDecks,
  flashCardToEdit,
  isVisible,
  mode = 'create',
  onCloseVisibility,
  onSubmit,
}: FlashCardFormProps) {
  const defaultDeck = flashCardToEdit?.deckId ?? availableDecks[0].id;
  const [form, setForm] = useState({
    front: flashCardToEdit?.front || '',
    back: flashCardToEdit?.back || '',
    belongsToDeck: defaultDeck,
  });

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (deckId: string) => {
    setForm({ ...form, belongsToDeck: deckId });
  };

  const handleSumbit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!isValidForm) return;
    const newFlashCardData = new FlashCard({
      front: form.front,
      back: form.back,
      deckId: form.belongsToDeck || availableDecks[0].id,
      id: flashCardToEdit?.id,
      nextReview: flashCardToEdit?.nextReview,
    });
    onSubmit(newFlashCardData);
    handleCloseVisibility();
  };

  const resetForm = () => {
    setForm({
      front: flashCardToEdit?.front || '',
      back: flashCardToEdit?.back || '',
      belongsToDeck: defaultDeck,
    });
  };

  const handleCloseVisibility = () => {
    if (mode === 'create') {
      resetForm();
      return;
    }
    onCloseVisibility();
  };

  const titleText = mode === 'create' ? 'New Card' : 'Edit Card';

  const isValidForm = form.front.trim() !== '' || form.back.trim() !== '';

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
              <Label htmlFor="deck" className="text-right">
                Deck
              </Label>
              <Select name="deck" defaultValue={defaultDeck} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Deck" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {availableDecks.map((deck) => (
                      <SelectItem key={deck.id} value={deck.id} className="flex items-center gap-2">
                        <span>{deck.name}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="front" className="text-right">
                Front
              </Label>
              <Input
                className="col-span-3"
                value={form.front}
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
                value={form.back}
                name="back"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!isValidForm}>
              {mode === 'create' ? 'Create' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
