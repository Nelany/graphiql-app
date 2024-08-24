'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../../firebase';
import styles from './SignInButton.module.css';

export default function SignInButton() {
  const [user, loading] = useAuthState(auth);
  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = () => {
    router.push('/SignIn');
  };
  return !user && !loading ? (
    <button onClick={handleClick} className={styles['sign-in-button']}>
      {t('home:buttonSignIn')}
    </button>
  ) : null;
}
