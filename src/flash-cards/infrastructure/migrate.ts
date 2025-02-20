import { auth, db } from '@/auth/config/firebase';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';

export async function migrateDecks() {
  const currentUserId = auth.currentUser?.uid;
  if (!currentUserId) throw new Error('User not logged in');

  const decksRef = collection(db, 'users', currentUserId, 'decks');
  const decksSnapshot = await getDocs(decksRef);

  const batch = writeBatch(db);

  for (const deckDoc of decksSnapshot.docs) {
    const deckData = deckDoc.data();

    if (!deckData.cards || !deckData.cards.allCards) continue;

    const flashcardsCollectionRef = collection(deckDoc.ref, 'flashcards');

    for (const card of deckData.cards.allCards) {
      const flashcardRef = doc(flashcardsCollectionRef, card.id);
      batch.set(flashcardRef, card);
    }

    // Remove the `cards` field from the deck document
    batch.update(deckDoc.ref, {
      cards: null,
    });
  }

  await batch.commit();
  console.log('Migration completed!');
}
