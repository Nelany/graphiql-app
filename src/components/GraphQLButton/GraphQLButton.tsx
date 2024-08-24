'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../../firebase';

export const GraphQLButton = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const { t } = useTranslation();

  return user ? <button onClick={() => router.push('/GRAPHQL')}>{t('home:buttonGraphQL')}</button> : null;
};
