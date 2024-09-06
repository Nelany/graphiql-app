'use client';

import { useRouter } from 'next/navigation';

export default function RestFullButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/GET');
  };
  return <button onClick={handleClick}>RestFull</button>;
}
