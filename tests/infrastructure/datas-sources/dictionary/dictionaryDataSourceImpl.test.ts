import { describe, it, expect } from 'vitest';
import { SAMPLE_SENTENCES_MOCK, WORD_QUERY_MOCK } from '@/dictionary/mocks/dictionary.mocks';
import { DictionaryDataSourceImpl } from '@/dictionary/infrastructure/datas-sources/dictionaryDataSourceImpl';
import { DictionaryDataSource } from '@/dictionary/infrastructure/datas-sources/dictionaryDataSource';

describe('DictionaryDataSourceImpl', () => {
  let dataSource: DictionaryDataSource;

  beforeEach(() => {
    dataSource = new DictionaryDataSourceImpl();
  });

  it('should be instantiated', () => {
    expect(dataSource).toBeInstanceOf(DictionaryDataSourceImpl);
  });

  it('should call the correct API endpoint', async () => {
    const response = await dataSource.searchWord('test');
    expect(response).toStrictEqual(WORD_QUERY_MOCK);
  });

  it('should call the correct API endpoint', async () => {
    const response = await dataSource.searchSampleSenteces('test');
    expect(response).toStrictEqual(SAMPLE_SENTENCES_MOCK);
  });
});
