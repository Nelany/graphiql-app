'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';

const TokenChecker: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  // error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [user, loading, error] = useAuthState(auth);
  // error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  useEffect(() => {
    if (loading) return;

    if (user) {
      if (
        pathname === '/en/SignIn' ||
        pathname === '/en/SignUp' ||
        pathname === '/ru/SignUp' ||
        pathname === '/ru/SignIn'
      ) {
        console.log('Пользователь авторизован');
        router.push('/');
      }
    } else {
      if (
        pathname !== '/en/SignIn' &&
        pathname !== '/en/SignUp' &&
        pathname !== '/ru/SignUp' &&
        pathname !== '/ru/SignIn'
      ) {
        console.log('Пользователь не авторизован');
        router.push('/');
      }
    }
  }, [user, loading, pathname]);

  return <>{children}</>;
};

export default TokenChecker;
