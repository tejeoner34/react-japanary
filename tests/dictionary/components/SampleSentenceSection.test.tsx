import { render, screen } from '@testing-library/react';
import SampleSentenceSection from '../../../src/dictionary/components/SampleSentenceSection';
import { SAMPLE_SENTENCES_MOCK } from '@/dictionary/mocks/dictionary.mocks';

describe('SampleSentenceSection', () => {
  it('renders loading state correctly', () => {
    render(<SampleSentenceSection exampleSentences={[]} isLoading={true} />);

    const skeleton = screen.getByTestId('skeleton-sample-sentence');
    expect(skeleton).toBeInTheDocument();
  });

  it('should render component when not loading', () => {
    render(<SampleSentenceSection exampleSentences={SAMPLE_SENTENCES_MOCK} isLoading={false} />);

    const subTitle = screen.getByRole('heading', { name: /sentences/ });
    expect(subTitle).toBeInTheDocument();
  });

  it('should render sentences', () => {
    render(<SampleSentenceSection exampleSentences={SAMPLE_SENTENCES_MOCK} isLoading={false} />);

    const subTitle = screen.getByRole('heading', { name: /sentences/ });
    expect(subTitle).toBeInTheDocument();
    SAMPLE_SENTENCES_MOCK.forEach((sentence) => {
      expect(screen.getByText(sentence.english)).toBeInTheDocument();
    });
  });
});
