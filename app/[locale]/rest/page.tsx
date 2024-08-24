import RestFull from '@/components/Clients/RESTfull/RESTfull';
import initTranslations from '../../i18n';

type Props = { params: { locale: string } };

export default async function Rest(props: Props) {
  const { locale } = props.params;

  const { t } = await initTranslations(locale, ['rest']);

  return (
    <main>
      <h1>JSON Editor</h1>
      <RestFull />
    </main>
  );
}
