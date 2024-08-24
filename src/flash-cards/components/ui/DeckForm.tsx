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
import { DeckModel, Deck } from '@/flash-cards/domain/models/deck.model';
import { useState } from 'react';

interface DeckFormProps {
  deck?: DeckModel;
  isVisible: boolean;
  mode?: 'create' | 'edit';
  onCloseVisibility: () => void;
  onSubmit: (newDeck: DeckModel) => void;
}

export function DeckForm({
  deck,
  isVisible,
  mode = 'create',
  onCloseVisibility,
  onSubmit,
}: DeckFormProps) {
  const [form, setForm] = useState({
    name: deck?.name || '',
    description: deck?.description || '',
  });
  const isValidForm = form.name.trim() !== '';

  const handleSumbit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!isValidForm) return;
    onSubmit(
      new Deck({
        name: form.name,
        description: form.description,
        cards: deck?.cards,
        id: deck?.id,
      })
    );
    onCloseVisibility();
  };

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setForm({ ...form, [name]: value });
  };

  const titleText = mode === 'create' ? 'New deck' : 'Edit deck';

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
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                className="col-span-3"
                defaultValue={deck?.name}
                name="name"
                id="name"
                onChange={handleInputChange}
                placeholder="Kanji level..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripton
              </Label>
              <Input
                className="col-span-3"
                defaultValue={deck?.description}
                name="description"
                id="description"
                onChange={handleInputChange}
                placeholder="This deck is used for..."
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
