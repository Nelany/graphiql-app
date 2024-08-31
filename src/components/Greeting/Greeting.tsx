'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../../firebase';

export const Greeting = () => {
  const [user, loading] = useAuthState(auth);
  const { t } = useTranslation();
  const [displayName, setDisplayName] = useState<string | null>(null);

  const checkName = useCallback(() => {
    setTimeout(() => {
      if (user && user.displayName === null) {
        checkName();
      } else if (user) {
        setDisplayName(user.displayName);
      }
    }, 1000);
  }, [user]);

  useEffect(() => {
    if (!user) {
      setDisplayName(null);
    } else if (user.displayName === null) {
      checkName();
    } else {
      setDisplayName(user.displayName);
    }
  }, [user, checkName]);

  if (loading) return <div>Loading...</div>;
  return displayName ? <h1>{t('home:greeting') + displayName + '!'}</h1> : <h1>{t('home:header')}</h1>;
};
