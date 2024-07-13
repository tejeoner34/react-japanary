import { ExampleSentence } from '@/models/dictionary/searchResult';

interface Props {
  exampleSentences: ExampleSentence[];
}

export default function SampleSentenceSection({ exampleSentences }: Props) {
  return (
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
  );
}
