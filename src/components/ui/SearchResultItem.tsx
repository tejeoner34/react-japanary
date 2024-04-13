import { SearchResult } from '@/models/dictionary/searchResult';
import WordMeaningItem from './WordMeaningItem';
import { Badge } from './badge';

type SearchResultItemProps = {
  searchItem: SearchResult;
};
export default function SearchResultItem({ searchItem }: SearchResultItemProps) {
  return (
    <div className=" border-b-2 mb-5 pb-4">
      <h3 className="text-2xl font-semibold">{searchItem.slug}</h3>
      <div className="flex-col gap-10 sm:flex sm:flex-row">
        <div className="flex flex-col gap-2">
          <Badge variant="accent">{searchItem.isCommon ? 'Common' : 'Not common'}</Badge>
          {searchItem.jlptLevels.map((level) => (
            <Badge variant="secondary">{level}</Badge>
          ))}
        </div>

        <div>
          <WordMeaningItem senses={searchItem.senses} />
        </div>
      </div>
    </div>
  );
}
