import { useFlashCard } from '../hooks/useFlashCard';

const FlashcardApp: React.FC = () => {
  const { handleGrade, currentCard } = useFlashCard();

  if (!currentCard) {
    return <div>No hay tarjetas para revisar.</div>;
  }

  return (
    <div>
      <div>
        <p>{currentCard.question}</p>
        <button onClick={() => handleGrade(3)}>Fácil</button>
        <button onClick={() => handleGrade(2)}>Difícil</button>
        <button onClick={() => handleGrade(1)}>Incorrecta</button>
      </div>
    </div>
  );
};

export default FlashcardApp;
