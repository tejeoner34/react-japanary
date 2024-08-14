import { Button } from '@/common/components/ui';
import CustomText from '@/common/components/ui/CustomText';
import { FlashCardModel, Grade } from '@/flash-cards/domain/models/flashCards.model';
import { useState } from 'react';
import FlashCardForm from './FlashCardForm';
import { useFlashCardsContext } from '@/flash-cards/hooks/useFlashCardsContext';

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
  flashCard: FlashCardModel;
  totalStudyAmount: number;
}
export default function StudyFlashCard({ flashCard, totalStudyAmount }: StudyFlashCardProps) {
  const { decks, editFlashCard } = useFlashCardsContext();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const onShowResult = () => {
    setIsAnswerVisible(true);
  };

  const _difficultyButtonTpl = () => {
    return (
      isAnswerVisible &&
      DIFFICULTY_LEVEL_BUTTONS.map((button) => (
        <Button key={button.value} variant="secondaryShadow" onClick={onShowResult}>
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
        <div>{totalStudyAmount}</div>
      </div>

      <div className="mt-5">
        <CustomText text={isAnswerVisible ? flashCard.back : flashCard.front} />
      </div>

      <div className="fixed bottom-5 w-full flex justify-evenly items-center">
        {_difficultyButtonTpl()}
        {_showResultButtonTpl()}
      </div>
      <FlashCardForm
        availableDecks={decks}
        isVisible={isFormVisible}
        mode="edit"
        flashCardToEdit={flashCard}
        onCloseVisibility={() => setIsFormVisible(false)}
        onSubmit={editFlashCard}
      />
    </div>
  );
}
