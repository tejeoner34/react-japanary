import { render, screen } from '@testing-library/react';
import SearchResultsList from '@/dictionary/components/SearchResultsList';
import { WORD_QUERY_MOCK } from '@/dictionary/mocks/dictionary.mocks';
import { SearchResult } from '@/dictionary/models/searchResult';

vi.mock('@/dictionary/components/SearchResultItem', () => ({
  default: ({ searchItem }: { searchItem: SearchResult }) => (
    <div data-testid="search-result-item">{searchItem.slug}</div>
  ),
}));

describe('SearchResultsList', () => {
  it('renders loading skeleton when isLoading is true', () => {
    render(<SearchResultsList searchResultsList={[]} isLoading={true} />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders content correctly when component is not loading', () => {
    render(<SearchResultsList searchResultsList={WORD_QUERY_MOCK} isLoading={false} />);
    const searchResultItems = screen.getAllByTestId('search-result-item');
    WORD_QUERY_MOCK.forEach((mock, index) => {
      const renderedItem = searchResultItems[index];
      expect(renderedItem.textContent).toBe(mock.slug);
    });
  });
});
