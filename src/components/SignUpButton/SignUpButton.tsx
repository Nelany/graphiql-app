'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../../firebase';
import styles from './SignUpButton.module.css';

export default function SignUpButton() {
  const [user, loading] = useAuthState(auth);

  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = () => {
    router.push('/SignUp');
  };

  return !user && !loading ? (
    <button onClick={handleClick} className={styles['sign-up-button']}>
      {t('home:buttonSignUp')}
    </button>
  ) : null;
}
