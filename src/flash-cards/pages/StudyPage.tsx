import { useNavigate, useParams } from 'react-router-dom';
import { useFlashCardsContext } from '../hooks/useFlashCardsContext';
import { useEffect, useMemo } from 'react';
import StudyFlashCard from '../components/ui/StudyFlashCard.component';

export default function StudyPage() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const { decks } = useFlashCardsContext();
  const deck = useMemo(() => decks.find((deck) => deck.id === deckId), [deckId, decks]);

  useEffect(() => {
    if (deck && deck.cards.pendingStudyAmount <= 0) {
      navigate('/decks');
    }
  }, [deck, navigate]);

  if (!deck) return <div>Deck not found</div>;
  if (deck?.cards.pendingStudyAmount <= 0) return null;

  return (
    <>
      <StudyFlashCard cardsToStudy={deck.cards.pedingStudyCards} />
    </>
  );
}
