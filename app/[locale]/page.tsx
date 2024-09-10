import { Greeting } from '@/components/Greeting/Greeting';
import { NavButton } from '@/components/NavButton/NavButton';
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
        <NavButton className={['main-nav-button']} isUser={true} rout="/GET" text={'home:buttonRest'} />
        <NavButton className={['main-nav-button']} isUser={true} rout="/GRAPHQL" text={'home:buttonGraphQL'} />
        <NavButton className={['main-nav-button']} isUser={true} rout="/History" text={'home:buttonHistory'} />
        <NavButton className={['main-nav-button']} isUser={true} rout="/" text={'Header:home'} />
        <NavButton className={['main-nav-button']} isUser={false} rout="/SignIn" text={'home:buttonSignIn'} />
        <NavButton className={['main-nav-button']} isUser={false} rout="/SignUp" text={'home:buttonSignUp'} />
      </div>
      <Greeting />
      <div className={styles['dark-area']}>
        <div className={styles.aLinkContainer}>
          <h2>{t('developers')}</h2>
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
        </div>

        <div>
          <h2 className={classNames(styles.h2, styles['light-blue-text'])}>{t('projectInfo')}</h2>
          <p>{t('projectText')}</p>
        </div>
        <div>
          <h2 className={classNames(styles.h2, styles['light-purple-text'])}>{t('courseInfo')}</h2>
          <p>{t('courseText')}</p>
        </div>
      </div>
    </main>
  );
}
