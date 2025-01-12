import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/common/components/ui/card';
import { useFlashCardsContext } from '../hooks/useFlashCardsContext';
import CustomText from '@/common/components/ui/CustomText';
import FlashCardDetailDialog from '../components/ui/FlashCardDetailDialog';
import { FlashCardModel } from '../domain/models/flashCards.model';

export default function SeeFlashcardsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [chosenCard, setChosenCard] = useState<FlashCardModel>({} as FlashCardModel);
  const { deckId } = useParams();
  const { getFlashCardsByDeckId } = useFlashCardsContext();
  const flashCards = getFlashCardsByDeckId(deckId!);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const onCardClick = (flashCard: FlashCardModel) => {
    setChosenCard(flashCard);
    toggleVisibility();
  };

  if (!flashCards.length) return <CustomText tag="h2" text="Loading..." />;

  return (
    <>
      <CustomText tag="h2" text="All flash cards" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {flashCards.map((flashCard) => (
          <Card
            key={flashCard.id}
            role="button"
            tabIndex={0}
            onClick={() => onCardClick(flashCard)}
          >
            <CardContent className="pt-6 text-center">
              <p>{flashCard.front}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <FlashCardDetailDialog
        isVisible={isVisible}
        onCloseVisibility={toggleVisibility}
        flashCard={chosenCard}
      />
    </>
  );
}
