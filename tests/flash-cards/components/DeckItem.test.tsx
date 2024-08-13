import DeckItem from '@/flash-cards/components/ui/DeckItem';
import { screen } from '@testing-library/react';
import { render } from '../../config/test-utils';
import { vi } from 'vitest';

describe('DeckItem', () => {
  const mockDeck = {
    id: '1',
    name: 'Test Deck',
    description: 'Test Description',
    cards: [],
  };

  const mockOnDelete = vi.fn();
  const mockOnEdit = vi.fn();

  it('renders deck name and description', () => {
    render(<DeckItem deck={mockDeck} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    expect(screen.getByText('Test Deck')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
