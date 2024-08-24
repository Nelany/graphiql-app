import ExampleClientComponent from '@/components/ExampleClientComponent/ExampleClientComponent';
import { GraphQLButton } from '@/components/GraphQLButton/GraphQLButton';
import { HistoryButton } from '@/components/HistoryButton/HistoryButton';
import { RestButton } from '@/components/RestButton/RestButton';
import SignInButton from '@/components/SignInButton/SignInButton';
import SignUpButton from '@/components/SignUpButton/SignUpButton';
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
    <main data-testid="main" className={styles.main}>
      <div className={styles['buttons-container']}>
        <HistoryButton />
        <SignInButton />
        <SignUpButton />
        <RestButton />
        <GraphQLButton />
      </div>
      <h1>{t('header')}</h1>
      <div className={styles['dark-area']}>
        <h2>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2, styles['light-yellow-text'])}>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2, styles['light-blue-text'])}>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2, styles['light-purple-text'])}>The code window might look like this)</h2>
        <h2 className={classNames(styles.h2)}>The code window might look like this)</h2>
      </div>
      <div className={styles['buttons-wrapper']}></div>
      <button>{t('button')}</button>
      <button className={styles['medium-light-element']}>{t('button2')}</button>
      <p className={styles['underlined-element']}>{t('message')}</p>
      <ExampleClientComponent />
    </main>
  );
}
