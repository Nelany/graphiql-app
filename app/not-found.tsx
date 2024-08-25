import Link from 'next/link';
import styles from './error.module.css';

export default function NotFound() {
  return (
    <div className={styles.main}>
      <h1>Ooops... Page not found!</h1>
      <Link href="/">
        <button>Go to Main</button>
      </Link>
    </div>
  );
}
