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
  apiKey: 'AIzaSyCvQKlhk8aUgEGJbv2sQp25avzwmiMW41k',
  authDomain: 'graphiql-app-72e35.firebaseapp.com',
  projectId: 'graphiql-app-72e35',
  storageBucket: 'graphiql-app-72e35.firebasestorage.app',
  messagingSenderId: '820376936651',
  appId: '1:820376936651:web:98863a75800507a1eebb4e',
  measurementId: 'G-VTXRDH65CS',
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
