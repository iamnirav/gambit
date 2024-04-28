import firebase from 'firebase/app';
import 'firebase/firestore';

const FIREBASE_CONFIG = {
  // apiKey
  authDomain: 'gambit-app.firebaseapp.com',
  projectId: 'gambit-app',
};

export default function initDb() {
  firebase.initializeApp(FIREBASE_CONFIG);
  return firebase.firestore();
}
