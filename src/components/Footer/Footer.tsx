import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.aLinkContainer}>
        <a href="https://github.com/Nelany" className={styles.aLink}>
          @Nelany
        </a>
        <a href="https://github.com/RemAntof" className={styles.aLink}>
          @RemAntof
        </a>
        <a href="https://github.com/Oksana-bondareva" className={styles.aLink}>
          @Oksana-bondareva
        </a>
      </div>
      <div className={styles.separator} />
      <div className={styles.yearText}>© 2024</div>
      <div className={styles.separator} />

      <a
        href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md"
        className={styles.logoLink}
      >
        <Image src="/rss-logo.svg" alt="logo" width={70} height={70} priority />
      </a>
    </footer>
  );
}
