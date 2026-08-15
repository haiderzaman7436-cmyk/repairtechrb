import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

type User = {
  uid: string;
  email: string;
  displayName: string;
  isAdmin?: boolean;
  isAnonymous?: boolean;
} | null;

interface AuthContextType {
  user: User;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string, phone: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();

          const isAdmin = firebaseUser.email === 'admin@repairtechrb.co.za';

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: userData?.displayName || firebaseUser.email?.split('@')[0] || '',
            isAdmin: isAdmin,
            isAnonymous: firebaseUser.isAnonymous
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          const isAdmin = firebaseUser.email === 'admin@repairtech.co.za';

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.email?.split('@')[0] || '',
            isAdmin: isAdmin,
            isAnonymous: firebaseUser.isAnonymous
          });
        }
      } else {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error("Anonymous auth failed:", error);
          setUser(null);
          setLoading(false);
        }
        return; // loading will be set to false when the anonymous login triggers onAuthStateChanged again
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
    // onAuthStateChanged will handle setting the user state
  };

  const register = async (email: string, pass: string, name: string, phone: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;

    // Create the user document in Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      email,
      displayName: name,
      phone,
      isAdmin: false, // By default, new users are not admins
      createdAt: new Date().toISOString()
    });
    // onAuthStateChanged will handle setting the user state
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseUser = userCredential.user;

    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || '',
        phone: '',
        isAdmin: false,
        createdAt: new Date().toISOString()
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithGoogle, resetPassword, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

