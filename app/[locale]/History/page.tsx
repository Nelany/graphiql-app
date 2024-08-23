import initTranslations from '../../i18n';
import classNames from 'classnames';
import styles from './page.module.css';

type Props = { params: { locale: string } };

export default async function History(props: Props) {
  const { locale } = props.params;

  const { t } = await initTranslations(locale, ['History']);

  return (
    <main className={styles.main}>
      <h1 className={classNames(styles['light-blue-text'])}>{t('tittle')}</h1>
    </main>
  );
}
