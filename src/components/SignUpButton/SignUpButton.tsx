'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styles from './SignUpButton.module.css';

export default function SignUpButton() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = () => {
    router.push('/SignUp');
  };

  return (
    <button onClick={handleClick} className={styles['sign-up-button']}>
      {t('home:buttonSignUp')}
    </button>
  );
}
