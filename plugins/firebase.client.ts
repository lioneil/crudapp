import { initializeApp } from 'firebase/app';
import {
  type Auth,
  type User,
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export interface FirebasePlugin {
  auth: Auth;
  provider: typeof GoogleAuthProvider;
  signInWithPopup: typeof signInWithPopup;
  signOut: typeof signOut;
  [key: string]: any;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.app.firebaseApiKey,
    authDomain: config.app.firebaseAuthDomain,
    projectId: config.app.firebaseProjectId,
    storageBucket: config.app.firebaseStorageBucket,
    messagingSenderId: config.app.firebaseMessagingSenderId,
    appId: config.app.firebaseAppId,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = GoogleAuthProvider;
  const user = useState<User | null>('auth.user', () => null);

  setPersistence(auth, browserLocalPersistence);

  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;
      await refreshToken(firebaseUser);
    } else {
      user.value = null;
    }
  });

  async function refreshToken(user: User) {
    try {
      const token = await user.getIdToken(true);
      useState<string>('auth.token', () => token);
    } catch (error) {
      console.error('Token refresh error:', error);
      await signOut(auth);
      await navigateTo('/login');
    }
  }

  const firebase: FirebasePlugin = {
    auth,
    provider,
    signInWithPopup,
    refreshToken,
    signOut,
  };

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

  nuxtApp.vueApp.provide('firebase', firebase);
  nuxtApp.provide('firebase', firebase);
});
