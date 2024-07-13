import Form from '@/dictionary/components/Form';
import SearchResultsList from '@/dictionary/components/SearchResultsList';
import { useDictionary } from '@/dictionary/hooks/useDictionary';
import SampleSentenceSection from '../components/SampleSentenceSection';
import { Button } from '@/common/components/ui';

export default function DictionaryScreen() {
  const { searchWord, searchSampleSenteces, sampleSentences, searchedWordResult } = useDictionary();
  const handleSearch = (word: string) => {
    searchSampleSenteces(word);
    searchWord(word);
  };
  return (
    <div className="container grid place-items-center gap-4 p-5">
      <div className="bg-backgroundSecondary max-w-md w-full">
        <Form onSubmit={handleSearch} />
      </div>

      <div className="flex flex-col gap-5 w-full md:flex-row">
        <div className="bg-backgroundSecondary h-fit">
          <SearchResultsList searchResultsList={searchedWordResult} />
        </div>
        <div className="max-w-md  bg-backgroundSecondary">
          <SampleSentenceSection exampleSentences={sampleSentences} />
        </div>
      </div>
      <div className="fixed bottom-10 md:invisible ">
        <Button>+</Button>
      </div>
    </div>
  );
}
