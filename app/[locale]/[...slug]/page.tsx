import GraphQL from '@/components/Clients/GraphQL/GraphQl';
import RestFull from '@/components/Clients/RESTfull/RESTfull';
import { decode64 } from '@/utils/base64';
import { redirect } from 'next/navigation';
import { fetchData } from '../../actions';
import initTranslations from '../../i18n';
import styles from './page.module.css';

type Props = {
  params: {
    slug: string[];
    locale: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

const validSlugs = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'GRAPHQL'];

export default async function RESTGraphQL(props: Props) {
  const { slug, locale } = props.params;
  const { searchParams } = props;
  const { t } = await initTranslations(locale, ['RESTGraphQL']);
  if (!validSlugs.includes(slug[0])) {
    redirect('/404');
  }

  const method = slug[0];
  const endpoint = slug[1] ? decode64(slug[1].replace('%3D', '=')) : '';
  const headers =
    Object.keys(searchParams).length > 0
      ? Object.entries(searchParams).map(([key, value]) => {
          return { key: key, value: value };
        })
      : undefined;
  const body = slug[2] ? decode64(slug[2].replace('%3D', '=')) : '';

  if (!validSlugs.includes(slug[0])) {
    redirect('/404');
  }

  const queryParams =
    Object.keys(searchParams).length > 0 ? (
      Object.entries(searchParams).map(([key, value]) => <div key={key}>{`${key}: ${value}`}</div>)
    ) : (
      <div>{t('noQueryParameters')}</div>
    );
  const restQlPage =
    slug[0] === 'GRAPHQL' ? (
      <GraphQL
        method={method}
        endpoint={endpoint}
        body={body}
        headers={headers}
        locale={locale}
        fetchData={fetchData}
      />
    ) : (
      <RestFull
        fetchData={fetchData}
        method={method}
        endpoint={endpoint}
        body={body}
        headers={headers}
        locale={locale}
      />
    );

  return <main className={styles.main}>{restQlPage}</main>;
}
