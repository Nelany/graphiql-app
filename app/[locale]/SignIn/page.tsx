import initTranslations from '../../i18n';
import classNames from 'classnames';
import styles from './page.module.css';
import SignInForm from '@/components/SignInForm/SignInForm';

type Props = { params: { locale: string } };

export default async function SignIn(props: Props) {
  const { locale } = props.params;

  const { t } = await initTranslations(locale, ['signIn']);

  return (
    <main className={styles.main}>
      <h1 className={classNames(styles['light-blue-text'])}>{t('tittle')}</h1>
      <SignInForm />
    </main>
  );
}
