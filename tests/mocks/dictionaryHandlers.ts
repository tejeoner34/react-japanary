import { SAMPLE_SENTENCES_MOCK, WORD_QUERY_MOCK } from '@/dictionary/mocks/dictionary.mocks';
import { http, HttpResponse } from 'msw';

const BASE_URL: string = import.meta.env.VITE_DICTIONARY_BASE_URL + 'dictionary';

export const dictionaryHanlders = [
  http.get(BASE_URL, () => {
    console.log('ASDADSADSADSADSADSADASDAS');
    return HttpResponse.json(WORD_QUERY_MOCK);
  }),
  http.get(`${BASE_URL}/sample-sentence`, () => {
    return HttpResponse.json(SAMPLE_SENTENCES_MOCK);
  }),
];
