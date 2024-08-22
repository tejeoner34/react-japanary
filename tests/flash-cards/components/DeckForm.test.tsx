import { DeckForm } from '@/flash-cards/components/ui/DeckForm';
import { Deck } from '@/flash-cards/domain/models/deck.model';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

describe('DeckForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCloseVisibility = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with correct title for create mode', () => {
    render(
      <DeckForm
        isVisible={true}
        onCloseVisibility={mockOnCloseVisibility}
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByText('New deck')).toBeInTheDocument();
  });

  it('renders the form with correct title for edit mode', () => {
    render(
      <DeckForm
        isVisible={true}
        onCloseVisibility={mockOnCloseVisibility}
        onSubmit={mockOnSubmit}
        mode="edit"
        deck={
          new Deck({
            id: '1',
            name: 'Test Deck',
            description: 'Test Description',
            cards: {
              allCards: [],
              pedingStudyCards: [],
              pendingStudyAmount: 0,
              totalAmount: 0,
            },
          })
        }
      />
    );
    expect(screen.getByText('Edit deck')).toBeInTheDocument();
  });

  it('disables submit button when name is empty', () => {
    render(
      <DeckForm
        isVisible={true}
        onCloseVisibility={mockOnCloseVisibility}
        onSubmit={mockOnSubmit}
      />
    );
    const submitButton = screen.getByRole('button', { name: 'Create Deck' });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when name is not empty', () => {
    render(
      <DeckForm
        isVisible={true}
        onCloseVisibility={mockOnCloseVisibility}
        onSubmit={mockOnSubmit}
      />
    );
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'New Deck' } });
    const submitButton = screen.getByRole('button', { name: 'Create Deck' });
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onSubmit with correct data when form is submitted', () => {
    render(
      <DeckForm
        isVisible={true}
        onCloseVisibility={mockOnCloseVisibility}
        onSubmit={mockOnSubmit}
      />
    );
    const nameInput = screen.getByLabelText('Name');
    const descriptionInput = screen.getByLabelText('Descripton');
    fireEvent.change(nameInput, { target: { value: 'New Deck' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    const submitButton = screen.getByRole('button', { name: 'Create Deck' });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'New Deck',
        description: 'New Description',
        cards: [],
      })
    );
  });

  it('calls onCloseVisibility when form is submitted', () => {
    render(
      <DeckForm
        isVisible={true}
        onCloseVisibility={mockOnCloseVisibility}
        onSubmit={mockOnSubmit}
      />
    );
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'New Deck' } });
    const submitButton = screen.getByRole('button', { name: 'Create Deck' });
    fireEvent.click(submitButton);
    expect(mockOnCloseVisibility).toHaveBeenCalled();
  });

  it('pre-fills form fields when editing an existing deck', () => {
    const existingDeck = {
      id: '1',
      name: 'Existing Deck',
      description: 'Existing Description',
      cards: {
        allCards: [],
        pedingStudyCards: [],
        pendingStudyAmount: 0,
        totalAmount: 0,
      },
    };
    render(
      <DeckForm
        isVisible={true}
        onCloseVisibility={mockOnCloseVisibility}
        onSubmit={mockOnSubmit}
        mode="edit"
        deck={new Deck(existingDeck)}
      />
    );
    expect(screen.getByLabelText('Name')).toHaveValue('Existing Deck');
    expect(screen.getByLabelText('Descripton')).toHaveValue('Existing Description');
  });
});
