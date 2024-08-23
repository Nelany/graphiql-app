'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styles from './SignInButton.module.css';

export default function SignInButton() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = () => {
    router.push('/SignIn');
  };
  return (
    <button onClick={handleClick} className={styles['sign-in-button']}>
      {t('home:buttonSignIn')}
    </button>
  );
}
