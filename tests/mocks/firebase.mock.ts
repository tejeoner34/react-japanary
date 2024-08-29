export const initializeApp = vitest.fn(() => ({}));
export const getAuth = vitest.fn(() => ({
  currentUser: null,
  signInWithEmailAndPassword: vitest.fn(),
  createUserWithEmailAndPassword: vitest.fn(),
  signOut: vitest.fn(),
  onAuthStateChanged: vitest.fn(),
}));
export const getFirestore = vitest.fn(() => ({}));
