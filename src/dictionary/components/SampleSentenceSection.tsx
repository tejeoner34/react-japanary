import { ExampleSentence } from '@/models/dictionary/searchResult';

interface Props {
  exampleSentences: ExampleSentence[];
}

export default function SampleSentenceSection({ exampleSentences }: Props) {
  const mockExample = {
    english:
      'The 52nd graduation ceremony will be held on March 20 at the school’s auditorium. Please use public transportation when coming to the ceremony.',
    japanese: [
      { furigana: '', word: '' },
      { furigana: 'さんがつはつか', word: '3月20日' },
      { furigana: '', word: 'に本校講堂で' },
      { furigana: 'だいごじゅうにかい', word: '第52回' },
      { furigana: '', word: '卒業式を' },
      { furigana: 'おこな', word: '行います' },
      { furigana: '', word: '。なお、ご' },
      { furigana: 'らいじょう', word: '来場' },
      { furigana: '', word: 'の' },
      { furigana: 'さい', word: '際' },
      { furigana: '', word: 'には公共交通機関をご利用ください。' },
    ],
  };
  return (
    <>
      {exampleSentences.map((sentece, index) => (
        <div key={index}>
          <div className="sample-sentence__japanese-block">
            <p className="sample-sentence__japanese-text">
              {sentece.japanese.map((item) => item.word).join(' ')}
            </p>
          </div>
          <div className="sample-sentence__english-block">
            <p className="sample-sentence__english-text">{sentece.english}</p>
          </div>
        </div>
      ))}
    </>
  );
}
