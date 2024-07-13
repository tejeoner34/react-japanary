import { SearchResult } from '@/models/dictionary/searchResult';
import WordMeaningItem from './WordMeaningItem';
import { Badge } from '../../common/components/ui/badge';

type SearchResultItemProps = {
  searchItem: SearchResult;
};
export default function SearchResultItem({ searchItem }: SearchResultItemProps) {
  return (
    <div className="mb-5 pb-4">
      <span className="text-sm">{searchItem.japaneseReadings[0].reading}</span>
      <h3 className="text-2xl font-semibold">{searchItem.slug}</h3>
      <div className="flex-col gap-10 sm:flex sm:flex-row">
        <div className="flex flex-col gap-2">
          <Badge variant="accent">{searchItem.isCommon ? 'Common' : 'Not common'}</Badge>
          {searchItem.jlptLevels.map((level, index) => (
            <Badge key={index} variant="secondary">
              {level}
            </Badge>
          ))}
        </div>

        <div>
          <WordMeaningItem senses={searchItem.senses} />
        </div>
      </div>
    </div>
  );
}
