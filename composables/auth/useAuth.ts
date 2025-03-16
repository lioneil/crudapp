import { type Auth, onAuthStateChanged } from 'firebase/auth';
import isEmpty from 'lodash/isEmpty';
import type { FirebasePlugin } from '~/plugins/firebase.client';

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export function useAuth() {
  const { $auth, $firebase } = useNuxtApp() as unknown as { $auth: Auth, $firebase: FirebasePlugin };
  const user = useState<User | null>('auth.user', () => null);
  const loading = useState<Boolean>('auth.loading', () => true);
  const route = useRoute();

  async function setupUser () {
    loading.value = true;
    user.value = await onFirebaseAuthStateChanges();
    loading.value = false;
    await setupRedirects();
  }

  async function onFirebaseAuthStateChanges(): Promise<User | null> {
    return await new Promise((resolve) => {
      onAuthStateChanged($auth, (user) => resolve(user as (User | null)));
    });
  }

  async function isLoggedIn() {
    return await onFirebaseAuthStateChanges();
  }

  async function setupRedirects() {
    if (isEmpty(user.value) && route.path !== '/login') {
      return navigateTo('/login');
    }

    if (route.path === '/login' && !isEmpty(user.value)) {
      return navigateTo('/dashboard');
    }
  }

  async function login() {
    const { provider, signInWithPopup } = $firebase;

    try {
      const result = await signInWithPopup($auth, new provider);
      const { user: data } = result;

      user.value = {
        uid: data.uid,
        displayName: data.displayName || '',
        email: data.email || '',
        photoURL: data.photoURL || '',
      };

      await navigateTo('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    const { signOut } = $firebase;
    try {
      await signOut($auth);

      user.value = null;

      await navigateTo('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return {
    loading,
    user,
    setupUser,
    setupRedirects,
    isLoggedIn,
    login,
    logout,
  };
}
