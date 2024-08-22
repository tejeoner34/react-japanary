import DeckItem from '@/flash-cards/components/ui/DeckItem';
import { screen } from '@testing-library/react';
import { render } from '../../config/test-utils';
import { vi } from 'vitest';
import { Deck } from '@/flash-cards/domain/models/deck.model';

describe('DeckItem', () => {
  const mockDeck = new Deck({
    id: '1',
    name: 'Test Deck',
    description: 'Test Description',
  });

  const mockOnDelete = vi.fn();
  const mockOnEdit = vi.fn();

  it('renders deck name and description', () => {
    render(
      <DeckItem deck={mockDeck} onDelete={mockOnDelete} onEdit={mockOnEdit} onClick={() => {}} />
    );

    expect(screen.getByText('Test Deck')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
