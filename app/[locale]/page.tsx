import ExampleClientComponent from '@/components/ExampleClientComponent/ExampleClientComponent';
import { NavButton } from '@/components/NavButton/NavButton';
import classNames from 'classnames';
import initTranslations from '../i18n';
import styles from './page.module.css';
import RestFullButton from '@/components/Clients/RESTfull/RestFullButton';
import { Greeting } from '@/components/Greeting/Greeting';

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
        <NavButton className={['main-nav-button']} isUser={true} rout="/GET" text={'home:buttonRest'} />
        <NavButton className={['main-nav-button']} isUser={true} rout="/GRAPHQL" text={'home:buttonGraphQL'} />
        <NavButton className={['main-nav-button']} isUser={true} rout="/History" text={'home:buttonHistory'} />
        <NavButton className={['main-nav-button']} isUser={true} rout="/" text={'Header:home'} />
        <NavButton className={['main-nav-button']} isUser={false} rout="/SignIn" text={'home:buttonSignIn'} />
        <NavButton className={['main-nav-button']} isUser={false} rout="/SignUp" text={'home:buttonSignUp'} />
      </div>
      <Greeting />
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
