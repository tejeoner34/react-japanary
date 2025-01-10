import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/common/components/ui/card';
import { useFlashCardsContext } from '../hooks/useFlashCardsContext';
import CustomText from '@/common/components/ui/CustomText';

export default function SeeFlashcardsPage() {
  const { deckId } = useParams();
  const { getFlashCardsByDeckId } = useFlashCardsContext();
  const flashCards = getFlashCardsByDeckId(deckId!);

  if (!flashCards.length) return <CustomText tag="h2" text="Loading..." />;

  return (
    <>
      <CustomText tag="h2" text="All flash cards" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {flashCards.map((flashCard) => (
          <Card key={flashCard.id} role="button" tabIndex={0}>
            <CardContent className="pt-6 text-center">
              <p>{flashCard.front}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
