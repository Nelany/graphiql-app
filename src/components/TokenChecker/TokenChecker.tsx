'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';

const TokenChecker: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(auth);
  console.log('ERROR', error, 'ERROR');

  useEffect(() => {
    if (loading) return;
    if (error) {
      throw new Error(error.message);
    }
    const checkTokenExpiration = async () => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const expirationTime = new Date(tokenResult.expirationTime);
        const currentTime = new Date();

        if (currentTime < expirationTime) {
          return true;
        }
        return false;
      }
      return false;
    };

    const validateToken = async () => {
      if (user && (await checkTokenExpiration())) {
        if (
          pathname === '/en/SignIn' ||
          pathname === '/en/SignUp' ||
          pathname === '/ru/SignUp' ||
          pathname === '/ru/SignIn'
        ) {
          router.push('/');
        }
      } else {
        if (
          pathname !== '/en/SignIn' &&
          pathname !== '/en/SignUp' &&
          pathname !== '/ru/SignUp' &&
          pathname !== '/ru/SignIn'
        ) {
          router.push('/');
        }
      }
    };
    validateToken();
  }, [user, loading, pathname, router, error]);

  return <>{children}</>;
};

export default TokenChecker;
