import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlashCardsContext } from '@/flash-cards/hooks/useFlashCardsContext';
import { Button } from '@/common/components/ui';
import CustomText from '@/common/components/ui/CustomText';
import { FlashCard, FlashCardModel, Grade } from '@/flash-cards/domain/models/flashCards.model';
import FlashCardForm from './FlashCardForm';

const DIFFICULTY_LEVEL_BUTTONS = [
  {
    name: 'Again',
    value: Grade.Again,
  },
  {
    name: 'Easy',
    value: Grade.Easy,
  },
  {
    name: 'Medium',
    value: Grade.Medium,
  },
  {
    name: 'Hard',
    value: Grade.Hard,
  },
];

interface StudyFlashCardProps {
  cardsToStudy: FlashCardModel[];
}
export default function StudyFlashCard({ cardsToStudy }: StudyFlashCardProps) {
  const navigate = useNavigate();
  const [currentFlashCard, setCurrentFlashCard] = useState(cardsToStudy[0]);

  const { decks, editFlashCard, updateFlashCardRevision } = useFlashCardsContext();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const onShowResult = () => {
    setIsAnswerVisible(true);
  };

  const handleDifficultySelection = (grade: Grade) => {
    const updatedCard = FlashCard.updateWithGrade(currentFlashCard, grade);
    updateFlashCardRevision(updatedCard);
    cardsToStudy.shift();
    if (grade === Grade.Again) {
      cardsToStudy.push(updatedCard);
    }
    if (!cardsToStudy.length) {
      navigate('/decks');
      return;
    }
    setCurrentFlashCard(cardsToStudy[0]);
    resetComponentState();
  };

  const resetComponentState = () => {
    setIsFormVisible(false);
    setIsAnswerVisible(false);
  };

  const _difficultyButtonTpl = () => {
    return (
      isAnswerVisible &&
      DIFFICULTY_LEVEL_BUTTONS.map((button) => (
        <Button
          key={button.value}
          variant="secondaryShadow"
          onClick={() => handleDifficultySelection(button.value)}
        >
          {button.name}
        </Button>
      ))
    );
  };

  const _showResultButtonTpl = () => {
    return (
      !isAnswerVisible && (
        <Button variant="secondaryShadow" onClick={onShowResult}>
          Show result
        </Button>
      )
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <Button variant="secondaryShadow" onClick={() => setIsFormVisible(true)}>
            Edit
          </Button>
        </div>
        <div>{cardsToStudy.length}</div>
      </div>

      <div className="mt-5">
        <CustomText
          styles="text-xl whitespace-pre-wrap"
          text={isAnswerVisible ? currentFlashCard.back : currentFlashCard.front}
        />
      </div>

      <div className="fixed bottom-5 w-full flex justify-evenly items-center">
        {_difficultyButtonTpl()}
        {_showResultButtonTpl()}
      </div>
      <FlashCardForm
        availableDecks={decks}
        isVisible={isFormVisible}
        mode="edit"
        flashCardToEdit={currentFlashCard}
        onCloseVisibility={() => setIsFormVisible(false)}
        onSubmit={editFlashCard}
      />
    </div>
  );
}
