import { useEffect, useState } from 'react';
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
  Textarea,
  Spinner,
} from '@/common/components/ui';
import { DeckModel } from '@/flash-cards/domain/models/deck.model';
import { FlashCard, FlashCardModel } from '@/flash-cards/domain/models/flashCards.model';
import { useDictionaryContext } from '@/dictionary/hooks/useDictionaryContext';
import { useFlashCardsContext } from '@/flash-cards/hooks/useFlashCardsContext';
import { Checkbox } from '@/common/components/ui/checkbox';
import CustomText from '@/common/components/ui/CustomText';

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
  const { searchAi, aiResponse, resetAiResponse, isAiResponseLoading } = useDictionaryContext();
  const { getDefaultDeck, setDefaultDeck, uploadImages, uploadImagesUrl } = useFlashCardsContext();
  const defaultDeck =
    flashCardToEdit?.deckId || getDefaultDeck()?.id || availableDecks[0]?.id || '';
  const [form, setForm] = useState({
    front: flashCardToEdit?.front || '',
    back: flashCardToEdit?.back || '',
    belongsToDeck: defaultDeck,
    isDefaultDeck: defaultDeck === getDefaultDeck()?.id,
    imagesUrl: flashCardToEdit?.imagesUrl || [],
  });
  const [rawImages, setRawImages] = useState<File[]>([]);

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = ev.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (deckId: string) => {
    setForm({ ...form, belongsToDeck: deckId, isDefaultDeck: getDefaultDeck()?.id === deckId });
  };

  const handleCheckboxChange = (value: boolean) => {
    setForm({ ...form, isDefaultDeck: value });
    if (value) {
      setDefaultDeck(form.belongsToDeck);
    }
  };

  const handlePreSubmitImg = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!rawImages.length) {
      handleSumbit();
      return;
    }

    uploadImages(rawImages);
  };

  const handleSumbit = (formData = form) => {
    if (!isValidForm) return;
    const newFlashCardData = new FlashCard({
      front: formData.front,
      back: formData.back,
      deckId: formData.belongsToDeck || availableDecks[0].id || '',
      id: flashCardToEdit?.id,
      nextReview: flashCardToEdit?.nextReview,
      imagesUrl: formData.imagesUrl,
    });
    onSubmit(newFlashCardData);
    handleCloseVisibility();
  };

  const handlePaste = async (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardItems = event.clipboardData.items;
    for (const item of clipboardItems) {
      if (item.type.startsWith('image/')) {
        event.preventDefault();
        const file = item.getAsFile();
        if (file) {
          setRawImages([...rawImages, file]);
        }
      }
    }
  };

  const resetForm = () => {
    setForm({
      ...form,
      front: flashCardToEdit?.front || '',
      back: flashCardToEdit?.back || '',
    });
    setRawImages([]);
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

  useEffect(() => {
    setForm({
      ...form,
      front: flashCardToEdit?.front || '',
      back: flashCardToEdit?.back || '',
    });
  }, [flashCardToEdit]);

  useEffect(() => {
    if (aiResponse) {
      setForm({
        ...form,
        back: flashCardToEdit?.back + '\n' + '\n' + aiResponse,
      });
    }
  }, [aiResponse]);

  useEffect(() => {
    return () => {
      resetAiResponse();
    };
  }, []);

  useEffect(() => {
    if (uploadImagesUrl.length) {
      setForm((prevForm) => ({ ...prevForm, imagesUrl: uploadImagesUrl }));
    }
  }, [uploadImagesUrl]);

  useEffect(() => {
    if (form.imagesUrl.length && uploadImagesUrl.length) {
      handleSumbit(form);
    }
  }, [form.imagesUrl, uploadImagesUrl]);

  return (
    <Dialog
      open={isVisible}
      onOpenChange={() => {
        onCloseVisibility();
      }}
    >
      <DialogContent className="min-w-[60%] min-h-[60%] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handlePreSubmitImg}>
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
                      <SelectItem
                        key={deck.id}
                        value={deck.id || ''}
                        className="flex items-center gap-2"
                      >
                        <span>{deck.name}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Checkbox
                className="justify-self-end"
                id="default-deck"
                checked={form.isDefaultDeck}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="default-deck">Is default deck</label>
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
              <Textarea
                className="col-span-3 min-h-52"
                value={form.back}
                name="back"
                onChange={handleInputChange}
                onPaste={handlePaste}
              />
            </div>
            {!!rawImages.length && (
              <div>
                <CustomText text="Remove added pics" />
                <Button onClick={() => setRawImages([])}>Remove</Button>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                className="w-full"
                type="button"
                variant="secondaryShadow"
                onClick={() => searchAi(form.front)}
                disabled={aiResponse !== '' || isAiResponseLoading}
              >
                More info
                <span className={`${isAiResponseLoading ? 'block' : 'hidden'} ml-3`}>
                  <Spinner />
                </span>
              </Button>
            </div>
          </div>
          <DialogFooter className="flex gap-3">
            <Button type="submit" disabled={!isValidForm}>
              {mode === 'create' ? 'Create' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
