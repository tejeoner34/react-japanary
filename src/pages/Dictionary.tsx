import Form from '@/components/ui/Form';
import SearchResultsList from '@/components/ui/SearchResultsList';
import { useDictionary } from '@/hooks/useDictionary';

export default function DictionaryScreen() {
  const { searchWord, searchedWordResult } = useDictionary();
  const handleSearch = (word: string) => {
    console.log(word);
    searchWord(word);
  };
  return (
    <div className="container grid place-items-center gap-4 p-5">
      <div className="max-w-md w-full">
        <Form onSubmit={handleSearch} />
      </div>

      <div className="w-full contents">
        <SearchResultsList searchResultsList={searchedWordResult} />
      </div>
    </div>
  );
}
