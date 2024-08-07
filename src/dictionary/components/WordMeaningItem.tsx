import { Button } from '@/common/components/ui';
import { Sense } from '../models/searchResult';

type WordMeaningItemProps = {
  senses: Sense[];
};

const seeAlsoTpl = (seeAlso: string[]) =>
  !!seeAlso.length && (
    <div className="flex items-center gap-2">
      <p>
        <span className="font-semibold">See also: </span>
      </p>
      <div className="flex gap-2">
        {seeAlso.map((item) => (
          <Button variant="primary" size="sm">
            {item}
          </Button>
        ))}
      </div>
    </div>
  );

const tagsTpl = (tags: string[]) =>
  !!tags.length && <span className="text-sm">Tags: {tags.map((item) => `${item}, `)}</span>;

const meaningsTpl = (meanings: string[]) => (
  <p className="font-semibold">{meanings.map((meaning) => `${meaning}, `)}</p>
);

export default function WordMeaningItem({ senses }: WordMeaningItemProps) {
  return (
    <>
      {senses.map((sense, senseIndex) => (
        <div
          key={senseIndex}
          className={`flex flex-col mb-4 pb-2 gap-1 ${
            senseIndex != senses.length - 1 && ' border-b-2'
          }`}
        >
          <p>
            <span className="font-semibold">Word type: </span>
            {sense.wordTypes[0]}
          </p>

          <div className="flex">
            <span>{`${(senseIndex += 1)}.`}&nbsp;</span>
            {meaningsTpl(sense.englishDefinitions)}
          </div>

          {tagsTpl(sense.tags)}
          {seeAlsoTpl(sense.seeAlso)}
        </div>
      ))}
    </>
  );
}
