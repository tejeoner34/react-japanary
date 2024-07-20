import { Input } from '@/common/components/ui';
import { render, screen } from '@testing-library/react';

describe('Input', () => {
  it('renders the input component', () => {
    render(<Input type="text" />);
    const headerElement = screen.getByRole('textbox');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the input component with placeholder', () => {
    render(<Input type="text" placeholder="Enter text" />);
    const headerElement = screen.getByPlaceholderText('Enter text');
    expect(headerElement).toBeInTheDocument();
  });
});
