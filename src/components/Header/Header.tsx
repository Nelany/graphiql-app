import LanguageChanger from '@/components/LanguageChanger/LanguageChanger';
import Image from 'next/image';
import styles from './Header.module.css';

type HeaderProps = {
  t: (key: string) => string;
};

export default function Header({ t }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles['header__content']}>
        <Image src="/ho.png" alt="logo" width={70} height={70} />
        <div className={styles['header__buttons-wrapper']}>
          <LanguageChanger />
          <button>{t('login')}</button>
        </div>
      </div>
    </header>
  );
}
