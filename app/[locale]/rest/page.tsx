import RestFull from '@/components/Clients/RESTfull/RestFull';
import initTranslations from '../../i18n';
import styles from './page.module.css';
import classNames from 'classnames';

type Props = { params: { locale: string } };

export default async function Rest(props: Props) {
  const { locale } = props.params;

  const { t } = await initTranslations(locale, ['rest']);

  return (
    <main className={styles.main}>
      <h1 className={classNames(styles['light-blue-text'])}>JSON Editor</h1>
      <RestFull />
    </main>
  );
}
