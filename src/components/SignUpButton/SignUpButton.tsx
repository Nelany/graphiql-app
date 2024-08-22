'use client';

import { useTranslation } from 'react-i18next';
import styles from './SignUpButton.module.css';

export default function SignUpButton() {
  const { t } = useTranslation();
  return <button className={styles['sign-up-button']}>{t('buttonSignUp')}</button>;
}
