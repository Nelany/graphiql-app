'use client';

import LanguageChanger from '@/components/LanguageChanger/LanguageChanger';
import Image from 'next/image';
import Link from 'next/link';
import { NavButton } from '../NavButton/NavButton';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';

type HeaderProps = {
  t: (key: string) => string;
};

export default function HeaderSticky({ t }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <Link href="/" className={styles['logo-link']}>
        <Image src="/ho.png" alt="logo" width={70} height={70} priority />
      </Link>
      <div className={styles['header__buttons-wrapper']}>
        <NavButton isUser={false} rout="/SignIn" text={'home:buttonSignIn'} />
        <NavButton isUser={false} rout="/SignUp" text={'home:buttonSignUp'} />
        <NavButton isUser={true} text={'Header:logOut'} />
        <NavButton isUser={true} rout="/" text={'Header:home'} />
        <LanguageChanger />
      </div>
    </header>
  );
}
