import { useState } from 'react';
import { FlashCard, FlashCardModel } from '@/flash-cards/domain/models/flashCards.model';
import { useFlashCardsContext } from '@/flash-cards/hooks/useFlashCardsContext';
import { SearchResult } from '../models/searchResult';
import { useDictionaryContext } from './useDictionaryContext';
import { formatSampleSentenceToString } from '../utils/strings';

export function useCreateCardFromDictionary(wordData: SearchResult) {
  const { decks, createFlashCard } = useFlashCardsContext();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newCardData, setNewCardData] = useState({} as FlashCard);
  const { sampleSentences } = useDictionaryContext();

  const openForm = () => {
    const meaningsArray = wordData.senses.map((sense) => sense.englishDefinitions.join(', '));
    const meaningsArrayToString = meaningsArray.join(', ');
    let template = `Reading: \n\n${wordData.japaneseReadings[0].reading}\n\nMeaning: \n\n${meaningsArrayToString}`;
    if (sampleSentences.length) {
      const { english, japanese } = formatSampleSentenceToString(sampleSentences[0]);
      template = template.concat(`\n\nSentences: \n\n${japanese}\n\n${english}`);
    }
    console.log(template);
    const newCard = new FlashCard({
      front: wordData.slug,
      back: template,
      deckId: decks[0].id,
    });
    setNewCardData(newCard);
    setIsFormVisible(true);
  };

  const handleCreateFlashCard = (newFlashCard: FlashCardModel) => {
    createFlashCard(newFlashCard);
    setNewCardData({} as FlashCard);
    setIsFormVisible(false);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setNewCardData({} as FlashCard);
  };

  return {
    isFormVisible,
    newCardData,
    openForm,
    handleCreateFlashCard,
    closeForm,
    decks,
  };
}
