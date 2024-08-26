'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../../firebase';

export const Greeting = () => {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const checkName = () => {
      setTimeout(() => {
        if (user) {
          if (user.displayName === null) {
            checkName();
          } else setDisplayName(user.displayName);
        }
      }, 1000);
    };
    checkName();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setDisplayName(null);
    }
  }, [user]);

  return displayName ? <h1>{t('home:greeting') + displayName + '!'}</h1> : <h1>{t('home:header')}</h1>;
};
