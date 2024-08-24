import LanguageChanger from '@/components/LanguageChanger/LanguageChanger';
import Image from 'next/image';
import { HomeButton } from '../HomeButton/HomeButton';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import SignInButton from '../SignInButton/SignInButton';
import SignUpButton from '../SignUpButton/SignUpButton';
import styles from './Header.module.css';

type HeaderProps = {
  t: (key: string) => string;
};

export default function Header({ t }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Image src="/ho.png" alt="logo" width={70} height={70} />
      <div className={styles['header__buttons-wrapper']}>
        <LanguageChanger />
        <SignInButton />
        <SignUpButton />
        <LogoutButton />
        <HomeButton />
      </div>
    </header>
  );
}
