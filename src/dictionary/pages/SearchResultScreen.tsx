import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDictionaryContext } from '../hooks/useDictionaryContext';
import CustomText from '@/common/components/ui/CustomText';
import SearchResultsList from '../components/SearchResultsList';
import SampleSentenceSection from '../components/SampleSentenceSection';
import Form from '../components/Form';

const SearchResultsScreen = () => {
  const {
    searchWord,
    sampleSentences,
    searchedWordResult,
    isSampleSentenceLoading,
    isSearchWordLoading,
  } = useDictionaryContext();
  const _showNoResultsTpl = !searchedWordResult.length && !isSearchWordLoading;
  const { query } = useParams();

  useEffect(() => {
    if (query) {
      searchWord(query);
    }
  }, [query]);

  return (
    <>
      <div className="z-50 fixed bottom-0 right-0 left-0 p-5 bg-backgroundSecondary max-w-md w-full md:relative md:p-0">
        <Form onSubmit={searchWord} value={query} />
      </div>

      <div className={`flex flex-col gap-3 ${!_showNoResultsTpl && 'hidden'}`}>
        <CustomText tag="h2" styles="text-4xl font-bold text-center" text="No Results Found" />
      </div>

      <div
        className={`flex flex-col gap-5 w-full pb-20 md:flex-row ${_showNoResultsTpl && 'hidden'}`}
      >
        <div className="flex-1 h-fit">
          <CustomText tag="h3" text="Meanings" styles="text-xl font-bold pb-2" />
          <div className="bg-backgroundSecondary h-fit">
            <SearchResultsList
              searchResultsList={searchedWordResult}
              isLoading={isSearchWordLoading}
            />
          </div>
        </div>

        <div className={`flex-1 max-w-md  bg-backgroundSecondary ${_showNoResultsTpl && 'hidden'}`}>
          <SampleSentenceSection
            exampleSentences={sampleSentences}
            isLoading={isSampleSentenceLoading}
          />
        </div>
      </div>
    </>
  );
};

export default SearchResultsScreen;
