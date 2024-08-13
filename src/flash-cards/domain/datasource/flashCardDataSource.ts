import { DeckModel } from '../models/deck.model';
import { FlashCardModel, Grade } from '../models/flashCards.model';

export interface FlashCardDataSource {
  createFlashCard(flashCard: FlashCardModel): DeckModel[];
  deleteFlashCard(flashCard: FlashCardModel): DeckModel[];
  editFlashCard(flashCard: FlashCardModel): void;
  getFlashCards(): FlashCardModel[];
  updateFlashCardRevision(flashCard: FlashCardModel, grade: Grade): void;
  getDecks(): DeckModel[];
  createDeck(deck: DeckModel): DeckModel[];
  editDeck(deck: DeckModel): DeckModel[];
  deleteDeck(deck: DeckModel): DeckModel[];
}
