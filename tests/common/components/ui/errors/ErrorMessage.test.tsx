import { render, screen } from '@testing-library/react';
import ErrorMessage from '../../../../../src/common/components/ui/errors/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the error message', () => {
    const message = 'An error occurred';
    render(<ErrorMessage message={message} />);
    const errorElement = screen.getByText(message);
    expect(errorElement).toBeInTheDocument();
  });

  it('renders nothing when message is empty', () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container).toHaveTextContent('');
  });
});
