import CustomText from '@/common/components/ui/CustomText';
import MultiWordForm from '../components/MultiWordForm';
import { useDictionary } from '../hooks/useDictionary';
import { Spinner } from '@/common/components/ui/Spinner';

export default function WordComparison() {
  const { searchCompareWords, compareResponse, isCompareWordsLoading, resetCompareResponse } =
    useDictionary();

  const handleCompare = (words: string[]) => {
    searchCompareWords(words);
  };

  const handleReset = () => {
    resetCompareResponse();
  };

  return (
    <>
      <div className="z-100 fixed bottom-0 right-0 left-0 p-5 bg-backgroundSecondary max-w-md w-full md:relative md:p-0">
        <MultiWordForm onSubmit={handleCompare} />
      </div>

      {isCompareWordsLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="large">
            <p className="mt-4">Comparing words...</p>
          </Spinner>
        </div>
      )}

      {compareResponse && !isCompareWordsLoading && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <CustomText tag="h1" styles="text-4xl font-bold" text="Comparison Results" />
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Back
            </button>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p>{compareResponse}</p>
          </div>
        </div>
      )}

      {!compareResponse && !isCompareWordsLoading && (
        <div className="flex flex-col gap-3">
          <CustomText tag="h1" styles="text-4xl font-bold text-center" text="Words comparison" />
          <CustomText
            styles="text-center"
            text="Compare different words to understand their differences and similarities. Ex: 辞書 vs 辞典"
          />
        </div>
      )}
    </>
  );
}
