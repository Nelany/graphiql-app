import Header from '@/components/Header/Header';
import TranslationsProvider from '@/components/TranslationsProvider/TranslationsProvider';
import initTranslations from '../i18n';

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout({ children, params: { locale } }: Props) {
  const { t, resources } = await initTranslations(locale, ['Header', 'exampleClientComponent']);

  return (
    <TranslationsProvider namespaces={[t('exampleClientComponent')]} locale={locale} resources={resources}>
      <Header t={t} />
      {children}
    </TranslationsProvider>
  );
}
