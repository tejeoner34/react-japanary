import Form from '@/dictionary/components/Form';
import SearchResultsList from '@/dictionary/components/SearchResultsList';
import { useDictionary } from '@/dictionary/hooks/useDictionary';
import SampleSentenceSection from '../components/SampleSentenceSection';

export default function DictionaryScreen() {
  const { searchWord, searchSampleSenteces, sampleSentences, searchedWordResult } = useDictionary();
  const handleSearch = (word: string) => {
    searchSampleSenteces(word);
    searchWord(word);
  };
  return (
    <div className="container grid place-items-center gap-4 p-5">
      <div className="max-w-md w-full">
        <Form onSubmit={handleSearch} />
      </div>

      <div className="w-full contents">
        <SearchResultsList searchResultsList={searchedWordResult} />
        <SampleSentenceSection exampleSentences={sampleSentences} />
      </div>
    </div>
  );
}
