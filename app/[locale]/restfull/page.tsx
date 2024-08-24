import styles from './page.module.css';
import RestFull from '@/components/Clients/RESTfull/RestFull';
import initTranslations from '../../i18n';

type Props = {
  params: {
    slug: string[];
    searchParams?: { [key: string]: string };
    locale: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

export default async function RESTGraphQL(props: Props) {
  const { locale } = props.params;
  const { t } = await initTranslations(locale, ['RESTGraphQL']);

  const method = 'GET';
  const endpoint = '';
  // const headers = JSON.parse('{}');
  const body = '';

  return (
    <main className={styles.main}>
      <h1>{t('tittle')}</h1>
      <RestFull method={method} endpoint={endpoint} body={body} />
    </main>
  );
}
