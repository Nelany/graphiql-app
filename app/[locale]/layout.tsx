import Header from '@/components/Header/Header';
import TokenChecker from '@/components/TokenChecker/TokenChecker';
import TranslationsProvider from '@/components/TranslationsProvider/TranslationsProvider';
import initTranslations from '../i18n';
import { ToastContainer } from 'react-toastify';
import Footer from '@/components/Footer/Footer';

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};
const namespaces = ['Header', 'exampleClientComponent', 'home', 'forms', 'signIn', 'signUp', 'RESTGraphQL', 'History'];

export default async function RootLayout({ children, params: { locale } }: Props) {
  const { t, resources } = await initTranslations(locale, namespaces);

  return (
    <TranslationsProvider namespaces={namespaces} locale={locale} resources={resources}>
      <Header t={t} />
      <TokenChecker>{children}</TokenChecker>
      <ToastContainer />
      <Footer />
    </TranslationsProvider>
  );
}
