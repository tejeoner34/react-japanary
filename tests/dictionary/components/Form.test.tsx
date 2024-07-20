import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../../../src/dictionary/components/Form';

describe('Form', () => {
  const inputText = 'text input';

  it('renders the form component', () => {
    render(<Form onSubmit={() => {}} />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should update input value when user types', () => {
    render(<Form onSubmit={() => {}} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: inputText } });
    expect(inputElement).toHaveValue(inputText);
  });

  it('should call onSubmit with correct input value', () => {
    const mockOnSubmit = vi.fn();
    render(<Form onSubmit={mockOnSubmit} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: inputText } });
    expect(inputElement).toHaveValue(inputText);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(mockOnSubmit).toHaveBeenCalledWith(inputText);
  });
});
