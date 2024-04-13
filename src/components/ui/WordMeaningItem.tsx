import { Sense } from '@/models/dictionary/searchResult';

type WordMeaningItemProps = {
  senses: Sense[];
};

const seeAlsoTpl = (seeAlso: string[]) =>
  !!seeAlso.length && <p>See also: {seeAlso.map((item) => item)}</p>;

const tagsTpl = (tags: string[]) => !!tags.length && <p>Tags: {tags.map((item) => item)}</p>;

const meaningsTpl = (meanings: string[]) => (
  <p className="font-semibold">{meanings.map((meaning) => `${meaning}, `)}</p>
);

export default function WordMeaningItem({ senses }: WordMeaningItemProps) {
  return (
    <>
      {senses.map((sense, senseIndex) => (
        <div className="flex flex-col mb-4 pb-2 border-b-2">
          <p>{sense.wordTypes[0]}</p>
          <div className="flex">
            <span>{`${(senseIndex += 1)}) `}</span>
            {meaningsTpl(sense.englishDefinitions)}
          </div>
          {tagsTpl(sense.tags)}
          {seeAlsoTpl(sense.seeAlso)}
        </div>
      ))}
    </>
  );
}
