'use client';

import { useEffect, useState } from 'react';
import LanguageChanger from '@/components/LanguageChanger/LanguageChanger';
import Image from 'next/image';
import Link from 'next/link';
import { NavButton } from '../NavButton/NavButton';
import styles from './Header.module.css';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
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
        <NavButton isUser={false} rout="/SignIn" text={t('home:buttonSignIn')} />
        <NavButton isUser={false} rout="/SignUp" text={t('home:buttonSignUp')} />
        <NavButton isUser={true} text={t('Header:logOut')} />
        <NavButton isUser={true} rout="/" text={t('Header:home')} />
        <LanguageChanger />
      </div>
    </header>
  );
}
