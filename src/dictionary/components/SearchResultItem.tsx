import WordMeaningItem from './WordMeaningItem';
import { Badge } from '../../common/components/ui/badge';
import { SearchResult } from '../models/searchResult';
import { Button } from '@/common/components/ui';
import FlashCardForm from '@/flash-cards/components/ui/FlashCardForm';
import { useCreateCardFromDictionary } from '../hooks/useCreateCardFromDictionary';

const createFlashCardTpl = (onClick: () => void) => (
  <Button variant="primary" size="sm" onClick={onClick}>
    Create Card
  </Button>
);

type SearchResultItemProps = {
  searchItem: SearchResult;
};
export default function SearchResultItem({
  searchItem: { slug, japaneseReadings, isCommon, jlptLevels, senses },
}: SearchResultItemProps) {
  const { isFormVisible, openForm, handleCreateFlashCard, decks, newCardData, closeForm } =
    useCreateCardFromDictionary({ slug, japaneseReadings, isCommon, jlptLevels, senses });

  return (
    <div className="mb-5 p-4 border-b-2">
      <div className="flex-col gap-10 sm:flex sm:flex-row">
        <div className="flex flex-col gap-2">
          <ruby className="text-2xl font-semibold">
            {slug}
            {japaneseReadings[0].reading && (
              <rt className="text-xs font-normal">{japaneseReadings[0].reading}</rt>
            )}
          </ruby>
          <Badge variant="accent">{isCommon ? 'Common' : 'Not common'}</Badge>
          {jlptLevels.map((level, index) => (
            <Badge key={index} variant="secondary">
              {level}
            </Badge>
          ))}
        </div>

        <div>
          <WordMeaningItem senses={senses} />
        </div>
        {createFlashCardTpl(openForm)}
      </div>

      {isFormVisible && (
        <FlashCardForm
          isVisible={isFormVisible}
          onSubmit={handleCreateFlashCard}
          availableDecks={decks}
          onCloseVisibility={closeForm}
          flashCardToEdit={newCardData}
        />
      )}
    </div>
  );
}
