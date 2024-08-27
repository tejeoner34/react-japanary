import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '../config/firebase';

class FirebaseService {
  async createUser(email: string, password: string) {
    console.log('ejecuta createUser');
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async signOut() {
    return auth.signOut();
  }
}

export default new FirebaseService();
