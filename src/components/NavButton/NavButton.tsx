'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth, logout } from '../../../firebase';
import styles from './NavButton.module.css';

type NavButtonProps = { text: string; rout?: string; isUser?: boolean | undefined; className?: string[] };
const LOG_OUT = 'Header:logOut';
const NAV_BUTTON = 'nav-button';

export const NavButton = ({ text, rout, isUser = undefined, className = [NAV_BUTTON] }: NavButtonProps) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { t } = useTranslation();
  let condition;

  if (isUser === undefined) {
    condition = true;
  } else if (isUser) {
    condition = user;
  } else {
    condition = !user && !loading;
  }

  function onClick() {
    if (text === LOG_OUT) {
      logout();
    } else if (rout) {
      router.push(rout);
    }
  }
  return condition ? (
    <button className={className.map((c) => styles[c] || '').join(' ')} onClick={onClick}>
      {t(text)}
    </button>
  ) : null;
};
