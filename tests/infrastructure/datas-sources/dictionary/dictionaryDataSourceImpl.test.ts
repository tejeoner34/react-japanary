import { describe, it, expect } from 'vitest';
import { DictionaryDataSourceImpl } from '../../../../src/infrastructure/datas-sources/dictionary/dictionaryDataSourceImpl';
import { DictionaryDataSource } from '@/infrastructure/datas-sources/dictionary/dictionaryDataSource';

describe('DictionaryDataSourceImpl', () => {
  let dataSource: DictionaryDataSource;

  beforeEach(() => {
    dataSource = new DictionaryDataSourceImpl();
  });

  it('should be instantiated', () => {
    expect(dataSource).toBeInstanceOf(DictionaryDataSourceImpl);
  });

  //   it('should implement DictionaryDataSource interface', () => {
  //     expect(dataSource).toHaveProperty('searchWord');
  //     expect(dataSource).toHaveProperty('searchSampleSentences');
  //   });

  //   it('should have searchWord method', () => {
  //     expect(typeof dataSource.searchWord).toBe('function');
  //   });

  //   it('should have searchSampleSentences method', () => {
  //     expect(typeof dataSource.searchSampleSentences).toBe('function');
  //   });
});
