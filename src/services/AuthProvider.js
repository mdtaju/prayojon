import firebase from 'firebase/app';
import 'firebase/auth';

export const AuthProvider = {
      loginWithGoogle: async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            try {
                  const userCreate = await firebase.auth().signInWithPopup(provider);
                  return {
                        user: userCreate.user
                  }
            } catch (err) {
                  return {
                        error: err.message
                  }
            }
      },
      logout: async () => {
            await firebase.auth().signOut();
      }
}