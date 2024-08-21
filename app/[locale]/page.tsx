import ExampleClientComponent from '@/components/ExampleClientComponent/ExampleClientComponent';
import TranslationsProvider from '@/components/TranslationsProvider/TranslationsProvider';
import classNames from 'classnames';
import initTranslations from '../i18n';
import styles from './page.module.css';
import LanguageChanger from '@/components/LanguageChanger/LanguageChanger';
type Props = {
  params: {
    locale: string;
  };
};

export default async function Home({ params: { locale } }: Props) {
  const { t, resources } = await initTranslations(locale, ['home', 'exampleClientComponent']);
  return (
    <TranslationsProvider namespaces={[t('exampleClientComponent')]} locale={locale} resources={resources}>
      <main data-testid="main" className={styles.main}>
        <h1>{t('header')}</h1>
        <div className={styles['dark-area']}>
          <h2>The code window might look like this)</h2>
          <h2 className={classNames(styles.h2, styles['light-yellow-text'])}>The code window might look like this)</h2>
          <h2 className={classNames(styles.h2, styles['light-blue-text'])}>The code window might look like this)</h2>
          <h2 className={classNames(styles.h2, styles['light-purple-text'])}>The code window might look like this)</h2>
          <h2 className={classNames(styles.h2)}>The code window might look like this)</h2>
        </div>
        <button>{t('button')}</button>
        <button className={styles['medium-light-element']}>{t('button2')}</button>
        <p className={styles['underlined-element']}>{t('message')}</p>
        <ExampleClientComponent />
        <LanguageChanger />
      </main>
    </TranslationsProvider>
  );
}
