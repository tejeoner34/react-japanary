import { Skeleton } from '@/common/components/ui/skeleton';
import { ExampleSentence } from '@/models/dictionary/searchResult';

interface Props {
  exampleSentences: ExampleSentence[];
  isLoading: boolean;
}

const SkeletonSampleSentence = ({ skeletonNumber = 4 }: { skeletonNumber?: number }) => (
  <div>
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

export default function SampleSentenceSection({ exampleSentences, isLoading }: Props) {
  return (
    <>
      {isLoading ? (
        <SkeletonSampleSentence />
      ) : (
        <div className="flex flex-col gap-5 p-5">
          <h3 className="font-semibold text-lg">Sample sentences</h3>
          <div className="flex flex-col gap-10">
            {exampleSentences.map((sentece, index) => (
              <div key={index} className="pb-2 border-b border-gray-300">
                <div>
                  {sentece.japanese.map(({ furigana, word }, index) => (
                    <ruby key={index}>
                      {word}
                      {furigana && <rt className="text-xs">{furigana}</rt>}
                    </ruby>
                  ))}
                </div>
                <div>
                  <p>{sentece.english}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
