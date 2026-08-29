import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Defer analytics initialization to improve First Contentful Paint (FCP)
export let analytics: any = null;
if (typeof window !== 'undefined') {
  const initAnalytics = async () => {
    try {
      const { getAnalytics } = await import('firebase/analytics');
      analytics = getAnalytics(app);
    } catch (e) {
      console.error('Failed to load analytics', e);
    }
  };

  // Wait for the browser to be idle before loading analytics
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(initAnalytics);
  } else {
    setTimeout(initAnalytics, 3000); // Fallback delay
  }
}

export default app;
