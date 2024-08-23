'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { logout } from '../../../firebase';

export default function SignOutButton() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = () => {
    logout();
    router.push('/');
  };

  return <button onClick={handleClick}>Sign Out</button>;
}
