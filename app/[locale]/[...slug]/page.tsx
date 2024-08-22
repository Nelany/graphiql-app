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
  const { slug, locale } = props.params;
  const { searchParams } = props;
  const { t } = await initTranslations(locale, ['RESTGraphQL']);
  const slugPath = slug.join('/');
  console.log(props);
  const queryParams =
    Object.keys(searchParams).length > 0 ? (
      Object.entries(searchParams).map(([key, value]) => <div key={key}>{`${key}: ${value}`}</div>)
    ) : (
      <div>{t('noQueryParameters')}</div>
    );

  return (
    <div>
      <h1>{t('tittle')}</h1>

      <h2>
        {t('slug')}
        {slugPath}
      </h2>
      <h3>{t('queryParametersTittle')}</h3>
      {queryParams}
    </div>
  );
}
