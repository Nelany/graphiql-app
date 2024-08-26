import styles from './page.module.css';
import RestFull from '@/components/Clients/RESTfull/RestFull';
import initTranslations from '../../i18n';

type Props = {
  params: {
    locale: string;
  };
};

export default async function RESTGraphQL(props: Props) {
  const { locale } = props.params;
  const { t } = await initTranslations(locale, ['RESTGraphQL']);

  const method = 'GET';
  const endpoint = '';
  const body = '';

  return (
    <main className={styles.main}>
      <h1>{t('tittle')}</h1>
      <RestFull method={method} endpoint={endpoint} body={body} />
    </main>
  );
}
