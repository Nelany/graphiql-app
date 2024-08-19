import classNames from 'classnames';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to the REST and GraphiQL client!</h1>
      <div className={styles['dark-area']}>
        <h2>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2, styles['light-yellow-text'])}>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2, styles['light-blue-text'])}>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2, styles['light-purple-text'])}>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2)}>The code window might look like this)</h2>
      </div>
      <button>BUTTON</button>
      <button className={styles['medium-light-element']}>BUTTON or something else</button>
      <p className={styles['underlined-element']}>We can try to use Next Ui library</p>
    </main>
  );
}
