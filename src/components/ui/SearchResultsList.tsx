import { SearchResult } from '@/models/dictionary/searchResult';
import SearchResultItem from './SearchResultItem';

type SearchResultsListProps = {
  searchResultsList: SearchResult[];
};

export default function SearchResultsList({ searchResultsList }: SearchResultsListProps) {
  return (
    <div>
      {searchResultsList.map((result, index) => (
        <SearchResultItem key={index} searchItem={result} />
      ))}
    </div>
  );
}
