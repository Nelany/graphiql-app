import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAP9wLmWoDazRiz1t55WuNSObhX7m_DUZw',
  authDomain: 'graphiql-app-83827.firebaseapp.com',
  projectId: 'graphiql-app-83827',
  storageBucket: 'graphiql-app-83827.appspot.com',
  messagingSenderId: '38772830976',
  appId: '1:38772830976:web:40f30f1c43dd6844c279e5',
  measurementId: 'G-GJSSPJ1R71',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: unknown) {
    return error;
  }
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await updateProfile(user, { displayName: name });
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (error: unknown) {
    return error;
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, logInWithEmailAndPassword, logout, registerWithEmailAndPassword };
