import { render, screen, fireEvent } from '../../config/test-utils';
import WordComparison from '../../../src/dictionary/pages/WordComparison';

describe('WordComparison page', () => {
  it('renders heading and description', () => {
    render(<WordComparison />);

    expect(screen.getByText(/words comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/compare different words/i)).toBeInTheDocument();
  });

  it('lists the words added before comparing', () => {
    render(<WordComparison />);
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'one' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'two' } });
    fireEvent.click(addButton);

    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });
});
