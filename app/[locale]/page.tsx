import classNames from 'classnames';
import initTranslations from '../i18n';
import styles from './page.module.css';
type Props = {
  params: {
    locale: string;
  };
};

export default async function Home({ params: { locale } }: Props) {
  const { t } = await initTranslations(locale, ['home']);
  return (
    <main className={styles.main}>
      <h1>{t('header')}</h1>
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
