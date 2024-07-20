import { SearchResult } from '@/models/dictionary/searchResult';
import SearchResultItem from './SearchResultItem';
import { Skeleton } from '@/common/components/ui/skeleton';

type SearchResultsListProps = {
  searchResultsList: SearchResult[];
  isLoading: boolean;
};

const SkeletonSearchResultItem = ({ skeletonNumber = 4 }: { skeletonNumber?: number }) => (
  <div data-testid="skeleton">
    {[...Array(skeletonNumber)].map((_, index) => (
      <div key={index} className="flex flex-col space-y-3 p-3">
        <Skeleton className="h-6 w-[50%] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    ))}
  </div>
);

export default function SearchResultsList({
  searchResultsList,
  isLoading,
}: SearchResultsListProps) {
  return (
    <div>
      {isLoading ? (
        <SkeletonSearchResultItem />
      ) : (
        <div className="space-y-3">
          {searchResultsList.map((result, index) => (
            <SearchResultItem key={index} searchItem={result} />
          ))}
        </div>
      )}
    </div>
  );
}
