import { useParams } from 'react-router-dom';
import { useFlashCardsContext } from '../hooks/useFlashCardsContext';
import { useMemo } from 'react';
import StudyFlashCard from '../components/ui/StudyFlashCard.component';

export default function StudyPage() {
  const { deckId } = useParams();
  const { decks } = useFlashCardsContext();
  const deck = useMemo(() => decks.find((deck) => deck.id === deckId), [deckId, decks]);
  if (!deck) return <div>Deck not found</div>;
  return (
    <>
      <StudyFlashCard cardsToStudy={deck.cards.pedingStudyCards} />
    </>
  );
}
