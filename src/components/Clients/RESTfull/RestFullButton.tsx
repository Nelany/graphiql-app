'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function RestFullButton() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = () => {
    router.push('/restfull');
  };
  return <button onClick={handleClick}>RestFull</button>;
}
