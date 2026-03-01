import { render, screen, fireEvent } from '@testing-library/react';
import WordComparison from '../../../src/dictionary/pages/WordComparison';

describe('WordComparison page', () => {
  it('renders heading and description', () => {
    render(<WordComparison />);

    expect(screen.getByText(/words comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/compare different words/i)).toBeInTheDocument();
  });

  it('shows current selection after comparing', () => {
    render(<WordComparison />);
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add/i });
    const compareButton = screen.getByRole('button', { name: /compare/i });

    fireEvent.change(input, { target: { value: 'one' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'two' } });
    fireEvent.click(addButton);

    fireEvent.click(compareButton);

    expect(screen.getByText(/current selection/i)).toBeInTheDocument();
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });
});
