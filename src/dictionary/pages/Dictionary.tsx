import Form from '@/dictionary/components/Form';
import SearchResultsList from '@/dictionary/components/SearchResultsList';
import { useDictionary } from '@/dictionary/hooks/useDictionary';
import SampleSentenceSection from '../components/SampleSentenceSection';
import CustomText from '@/common/components/ui/CustomText';

export default function DictionaryScreen() {
  const { searchWord, searchSampleSenteces, sampleSentences, searchedWordResult } = useDictionary();
  const _isSearchDone = searchedWordResult.length;
  const handleSearch = (word: string) => {
    searchSampleSenteces(word);
    searchWord(word);
  };

  return (
    <div className="container grid place-items-center gap-4 p-5">
      <div className="fixed bottom-0 p-5 bg-backgroundSecondary max-w-md w-full md:relative md:p-0">
        <Form onSubmit={handleSearch} />
      </div>

      <div className={`flex flex-col gap-3 ${_isSearchDone && 'hidden'}`}>
        <CustomText tag="h2" styles="text-4xl font-bold text-center" text="Japanese Dictionary" />
        <CustomText
          styles="text-center"
          text="Search for a word in Kanji, Hiragana or Katakana. Ex: 辞書"
        />
      </div>

      <div className={`flex flex-col gap-5 w-full md:flex-row ${!_isSearchDone && 'hidden'}`}>
        <div className="h-fit">
          <CustomText tag="h3" text="Meanings" styles="text-xl font-bold pb-2" />
          <div className="bg-backgroundSecondary h-fit">
            <SearchResultsList searchResultsList={searchedWordResult} />
          </div>
        </div>
        <div className={`max-w-md  bg-backgroundSecondary ${!sampleSentences.length && 'hidden'}`}>
          <SampleSentenceSection exampleSentences={sampleSentences} />
        </div>
      </div>
    </div>
  );
}
