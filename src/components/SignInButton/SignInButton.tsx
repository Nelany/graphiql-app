'use client';

import { useTranslation } from 'react-i18next';
import styles from './SignInButton.module.css';

export default function SignInButton() {
  const { t } = useTranslation();
  return <button className={styles['sign-in-button']}>{t('buttonSignIn')}</button>;
}
