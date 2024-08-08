import { useDictionaryContext } from '../hooks/useDictionaryContext';
import Form from '@/dictionary/components/Form';
import SearchResultsList from '@/dictionary/components/SearchResultsList';
import SampleSentenceSection from '../components/SampleSentenceSection';
import CustomText from '@/common/components/ui/CustomText';

export default function DictionaryScreen() {
  const {
    searchWord,
    sampleSentences,
    searchedWordResult,
    isSampleSentenceLoading,
    isSearchWordLoading,
  } = useDictionaryContext();
  const _isSearchDone = searchedWordResult.length || isSearchWordLoading;

  return (
    <div className="container grid place-items-center gap-4 p-5">
      <div className="z-100 fixed bottom-0 p-5 bg-backgroundSecondary max-w-md w-full md:relative md:p-0">
        <Form onSubmit={searchWord} />
      </div>

      <div className={`flex flex-col gap-3 ${_isSearchDone && 'hidden'}`}>
        <CustomText tag="h2" styles="text-4xl font-bold text-center" text="Japanese Dictionary" />
        <CustomText
          styles="text-center"
          text="Search for a word in Kanji, Hiragana or Katakana. Ex: 辞書"
        />
      </div>

      <div className={`flex flex-col gap-5 w-full pb-20 md:flex-row ${!_isSearchDone && 'hidden'}`}>
        <div className="h-fit">
          <CustomText tag="h3" text="Meanings" styles="text-xl font-bold pb-2" />
          <div className="bg-backgroundSecondary h-fit">
            <SearchResultsList
              searchResultsList={searchedWordResult}
              isLoading={isSearchWordLoading}
            />
          </div>
        </div>

        <div className={`max-w-md  bg-backgroundSecondary ${!_isSearchDone && 'hidden'}`}>
          <SampleSentenceSection
            exampleSentences={sampleSentences}
            isLoading={isSampleSentenceLoading}
          />
        </div>
      </div>
    </div>
  );
}
