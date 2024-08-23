import classNames from 'classnames';
import initTranslations from '../../i18n';
import styles from './page.module.css';

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

  const queryParams =
    Object.keys(searchParams).length > 0 ? (
      Object.entries(searchParams).map(([key, value]) => <div key={key}>{`${key}: ${value}`}</div>)
    ) : (
      <div>{t('noQueryParameters')}</div>
    );

  return (
    <main className={styles.main}>
      <h1>{t('tittle')}</h1>
      <div className={styles['dark-area']}>
        <h2 className={classNames(styles.h2, styles['light-yellow-text'])}>
          {t('slug')}
          {slugPath}
        </h2>
        <h3 className={classNames(styles.h2, styles['light-purple-text'])}>{t('queryParametersTittle')}</h3>
        {queryParams}
      </div>
    </main>
  );
}
