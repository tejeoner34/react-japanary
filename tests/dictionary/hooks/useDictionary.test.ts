import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDictionary } from '../../../src/dictionary/hooks/useDictionary';
import { DictionaryRepositoryImpl } from '@/repositories/dictionary/dictionaryRespositoryImpl';
import { DictionaryDSMockImpl } from '@/infrastructure/datas-sources/dictionary/dictionaryDSMockImpl';
const testRepository = new DictionaryRepositoryImpl(new DictionaryDSMockImpl());

describe('useDictionary', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDictionary(testRepository));

    expect(result.current.searchedWordResult).toEqual([]);
    expect(result.current.sampleSentences).toEqual([]);
    expect(result.current.isSearchWordLoading).toBe(false);
    expect(result.current.isSampleSentenceLoading).toBe(false);
  });

  it('should search for a word and get result', async () => {
    const { result } = renderHook(() => useDictionary(testRepository));

    expect(result.current.searchedWordResult).toEqual([]);
    await act(() => result.current.searchWord('test'));
    expect(result.current.searchedWordResult).not.toBe([]);
  });

  it('should search for sample sentence and return result', async () => {
    const { result } = renderHook(() => useDictionary(testRepository));

    expect(result.current.sampleSentences).toEqual([]);
    await act(() => result.current.searchSampleSenteces('test'));
    expect(result.current.sampleSentences).not.toBe([]);
  });
});
