'use client';
import styles from './error.module.css';

interface GlobalErrorProps {
  error: Error;
}

export default function GlobalError({ error }: GlobalErrorProps) {
  return (
    <div className={styles.main}>
      <h1>Something went wrong!</h1>
      <h3>Reload the application please!</h3>
      <p>{error.message}</p>
    </div>
  );
}
