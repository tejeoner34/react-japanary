import { render, screen, fireEvent } from '@testing-library/react';
import MultiWordForm from '../../../src/dictionary/components/MultiWordForm';

describe('MultiWordForm', () => {
  it('renders input, add and compare buttons', () => {
    render(<MultiWordForm onSubmit={() => {}} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /compare/i })).toBeInTheDocument();
  });

  it('adds words to the list and displays them', () => {
    render(<MultiWordForm onSubmit={() => {}} />);
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'first' } });
    fireEvent.click(addButton);
    expect(screen.getByText('first')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'second' } });
    fireEvent.click(addButton);
    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('removes a word when the close icon is clicked', () => {
    render(<MultiWordForm onSubmit={() => {}} />);
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(addButton);

    const removeIcon = screen.getByTestId('remove-icon');
    fireEvent.click(removeIcon);

    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });

  it('calls onSubmit with the current words when compare is clicked', () => {
    const mockSubmit = vi.fn();
    render(<MultiWordForm onSubmit={mockSubmit} />);
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add/i });
    const compareButton = screen.getByRole('button', { name: /compare/i });

    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'b' } });
    fireEvent.click(addButton);

    fireEvent.click(compareButton);
    expect(mockSubmit).toHaveBeenCalledWith(['a', 'b']);
  });
});
