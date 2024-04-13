import { SearchResult } from '@/models/dictionary/searchResult';
import { DictionaryDataSource } from './dictionaryDataSource';

export class DictionaryDSMockImpl implements DictionaryDataSource {
  async searchWord(word: string): Promise<SearchResult[]> {
    console.log(word);
    return new Promise((resolve) => {
      resolve(MOCK_RESPONSE);
    });
  }
}

const MOCK_RESPONSE: SearchResult[] = [
  {
    slug: 'お母さん',
    isCommon: true,
    japaneseReadings: [
      {
        word: 'お母さん',
        reading: 'おかあさん',
      },
    ],
    jlptLevels: ['jlpt-n5'],
    senses: [
      {
        englishDefinitions: ['mother', 'mom', 'mum', 'ma'],
        seeAlso: ['母さん'],
        tags: ['Honorific or respectful (sonkeigo) language'],
        wordTypes: ['Noun'],
      },
      {
        englishDefinitions: ['wife'],
        seeAlso: [],
        tags: ['Honorific or respectful (sonkeigo) language'],
        wordTypes: ['Noun'],
      },
      {
        englishDefinitions: ['you (of an elderly person older than the speaker)', 'she', 'her'],
        seeAlso: [],
        tags: ['Familiar language'],
        wordTypes: ['Pronoun'],
      },
    ],
  },
  {
    slug: 'お母さんっ子',
    isCommon: false,
    japaneseReadings: [
      {
        word: 'お母さんっ子',
        reading: 'おかあさんっこ',
      },
      {
        word: 'お母さん子',
        reading: 'おかあさんこ',
      },
    ],
    jlptLevels: [],
    senses: [
      {
        englishDefinitions: ["mother's boy", "mother's girl"],
        seeAlso: [],
        tags: [],
        wordTypes: ['Noun'],
      },
    ],
  },
  {
    slug: 'お母さんコーラス',
    isCommon: false,
    japaneseReadings: [
      {
        word: 'お母さんコーラス',
        reading: 'おかあさんコーラス',
      },
    ],
    jlptLevels: [],
    senses: [
      {
        englishDefinitions: ["housewives' choral group", "mothers' chorus group"],
        seeAlso: [],
        tags: ['Usually written using kana alone'],
        wordTypes: ['Noun'],
      },
    ],
  },
  {
    slug: '51868d11d5dda7b2c6002a2d',
    isCommon: false,
    japaneseReadings: [
      {
        reading: 'おかあさんといっしょ',
      },
    ],
    jlptLevels: [],
    senses: [
      {
        englishDefinitions: ['Okaasan to Issho'],
        seeAlso: [],
        tags: [],
        wordTypes: ['Wikipedia definition'],
        sentences: [],
      },
    ],
  },
];
