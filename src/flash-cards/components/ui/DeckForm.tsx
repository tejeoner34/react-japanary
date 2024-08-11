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

interface DeckFormProps {
  isVisible: boolean;
  onCloseVisibility: () => void;
  onSubmit: (newDeck: Deck) => void;
}

export function DeckForm({ isVisible, onCloseVisibility, onSubmit }: DeckFormProps) {
  const handleSumbit = (ev) => {
    // console.log(ev.target.name);
    // ev.preventDefault();
    // const form = ev.currentTarget;
    // const newDeck: Deck = {
    //   cards: [],
    //   description: (form.elements.namedItem('description') as HTMLInputElement).value,
    //   id: '', // tenemos que crear un Id unico
    //   name: (form.elements.namedItem('name') as HTMLInputElement).value,
    // };
    // onSubmit(newDeck);
    // onCloseVisibility();
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
              <Input id="name" placeholder="Kanji level..." className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descripton" className="text-right">
                Descripton
              </Label>
              <Input
                id="descripton"
                placeholder="This deck is used for..."
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Deck</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
