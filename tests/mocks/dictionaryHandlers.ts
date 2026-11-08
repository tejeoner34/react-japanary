import { SAMPLE_SENTENCES_MOCK, WORD_QUERY_MOCK } from '@/dictionary/mocks/dictionary.mocks';
import { ExampleSentence, SearchResult } from '@/dictionary/models/searchResult';
import { http, HttpResponse } from 'msw';

const origin = window.location.origin;
const JISHO_PROXY_URL = new URL('/proxy/jisho', origin).toString();
const TATOEBA_PROXY_URL = new URL('/proxy/tatoeba', origin).toString();

const toJishoRawResponse = (words: SearchResult[]) => ({
  data: words.map((word) => ({
    slug: word.slug,
    is_common: word.isCommon,
    jlpt: word.jlptLevels,
    japanese: word.japaneseReadings,
    senses: word.senses.map((sense) => ({
      english_definitions: sense.englishDefinitions,
      parts_of_speech: sense.wordTypes,
      tags: sense.tags,
      see_also: sense.seeAlso,
      sentences: sense.sentences,
    })),
  })),
});

const toTatoebaRawResponse = (sentences: ExampleSentence[]) => ({
  results: sentences.map((sentence) => ({
    text: sentence.japanese.map((part) => part.word).join(' '),
    translations: [[{ text: sentence.english }]],
  })),
});

export const dictionaryHanlders = [
  http.get(JISHO_PROXY_URL, () => HttpResponse.json(toJishoRawResponse(WORD_QUERY_MOCK))),
  http.get(TATOEBA_PROXY_URL, () =>
    HttpResponse.json(toTatoebaRawResponse(SAMPLE_SENTENCES_MOCK))
  ),
];
