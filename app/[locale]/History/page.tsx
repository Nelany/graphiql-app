import initTranslations from '../../i18n';

type Props = { params: { locale: string } };

export default async function History(props: Props) {
  const { locale } = props.params;

  const { t } = await initTranslations(locale, ['History']);

  return (
    <div>
      <h1>{t('tittle')}</h1>
    </div>
  );
}
