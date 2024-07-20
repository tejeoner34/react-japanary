import { render, screen } from '@testing-library/react';
import SearchResultItem from '@/dictionary/components/SearchResultItem';
import { WORD_QUERY_MOCK } from '@/dictionary/mocks/dictionary.mocks';

describe('SearchResultItem', () => {
  it('renders the slug and reading correctly', () => {
    render(<SearchResultItem searchItem={WORD_QUERY_MOCK[0]} />);
    const slug = screen.getByText('お母さん');
    expect(slug).toBeInTheDocument();
    const furigana = screen.getByText('おかあさん');
    expect(furigana).toBeInTheDocument();
  });
});
