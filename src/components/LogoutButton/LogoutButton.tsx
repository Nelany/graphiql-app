'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../../firebase';
import { logout } from '../../../firebase';

export const LogoutButton = () => {
  const [user] = useAuthState(auth);

  const { t } = useTranslation();

  return user ? <button onClick={logout}>{t('Header:logOut')}</button> : null;
};
