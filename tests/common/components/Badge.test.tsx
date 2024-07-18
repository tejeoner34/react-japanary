import { Badge } from '@/common/components/ui';
import { render, screen } from '@testing-library/react';

describe('Badge', () => {
  it('renders the badge component', () => {
    render(<Badge>Test</Badge>);
    const badgeElement = screen.getByRole('badge');
    expect(badgeElement).toBeInTheDocument();
  });
});
