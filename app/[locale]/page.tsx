import ExampleClientComponent from '@/components/ExampleClientComponent/ExampleClientComponent';
import SignInButton from '@/components/SignInButton/SignInButton';
import SignUpButton from '@/components/SignUpButton/SignUpButton';
import classNames from 'classnames';
import initTranslations from '../i18n';
import styles from './page.module.css';
import RestFullButton from '@/components/Clients/RESTfull/RestFullButton';

type Props = {
  params: {
    locale: string;
  };
};

export default async function Home({ params: { locale } }: Props) {
  const { t } = await initTranslations(locale, ['home']);
  return (
    <main data-testid="main" className={styles.main}>
      <div className={styles['buttons-container']}>
        <button>{t('signIn')}</button>
        <button>{t('signUp')}</button>
      </div>
      <h1>{t('header')}</h1>
      <div className={styles['dark-area']}>
        <h2>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2, styles['light-yellow-text'])}>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2, styles['light-blue-text'])}>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2, styles['light-purple-text'])}>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2)}>The code window might look like this)</h2>
      </div>
      <div className={styles['buttons-wrapper']}>
        <SignInButton />
        <SignUpButton />
      </div>
      <div>
        <RestFullButton />
      </div>
      <button>{t('button')}</button>
      <button className={styles['medium-light-element']}>{t('button2')}</button>
      <p className={styles['underlined-element']}>{t('message')}</p>
      <ExampleClientComponent />
    </main>
  );
}
