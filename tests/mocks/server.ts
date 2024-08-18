import { setupServer } from 'msw/node';
import { dictionaryHanlders } from './dictionaryHandlers';

export const server = setupServer(...dictionaryHanlders);
