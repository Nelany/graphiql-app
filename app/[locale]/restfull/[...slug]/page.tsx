import styles from './page.module.css';
import initTranslations from '../../../i18n';
import RestFull from '@/components/Clients/RESTfull/RestFull';
import { decode } from 'punycode';

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
  const { slug, locale } = props.params;
  const { searchParams } = props;
  const { t } = await initTranslations(locale, ['RESTGraphQL']);

  const method = slug[0] || 'GET';
  const endpoint = decode(searchParams.url || '');
  const headers = JSON.parse(decode(searchParams.headers || '{}'));
  const body = searchParams.body ? decode(searchParams.body) : '';

  const queryParams =
    Object.keys(searchParams).length > 0 ? (
      Object.entries(searchParams).map(([key, value]) => <div key={key}>{`${key}: ${value}`}</div>)
    ) : (
      <div>{t('noQueryParameters')}</div>
    );

  return (
    <main className={styles.main}>
      <h1>{t('tittle')}</h1>
      <RestFull method={method} endpoint={endpoint} headers={headers} body={body} />
    </main>
  );
}
