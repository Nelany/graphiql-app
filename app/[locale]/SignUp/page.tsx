import initTranslations from '../../i18n';
import classNames from 'classnames';
import styles from './page.module.css';

type Props = { params: { locale: string } };

export default async function SignUp(props: Props) {
  const { locale } = props.params;

  const { t } = await initTranslations(locale, ['signUp']);

  return (
    <main className={styles.main}>
      <h1 className={classNames(styles['light-blue-text'])}>{t('tittle')}</h1>
    </main>
  );
}
