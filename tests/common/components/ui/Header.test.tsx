import Header from '@/common/components/ui/Header';
import { render } from '../../../config/test-utils';
import { screen } from '@testing-library/react';

describe('Header', () => {
  it('renders the header component', () => {
    render(<Header />);
    const headerElement = screen.getByRole('navigation');
    expect(headerElement).toBeInTheDocument();
  });
});
