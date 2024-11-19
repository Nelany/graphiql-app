import '@testing-library/jest-dom';
import { vi } from 'vitest';
import initTranslations from '../i18n';
import RootLayout from './layout';

vi.mock('../i18n', () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve({ t: (key: string) => key })),
}));

describe('Home component', () => {
  it('calls initTranslations with the correct parameters', async () => {
    const locale = 'en';
    const children = <div>Test Content</div>;
    await RootLayout({ params: { locale }, children });

    expect(initTranslations).toHaveBeenCalledWith(locale, [
      'Header',
      'exampleClientComponent',
      'home',
      'forms',
      'signIn',
      'signUp',
      'RESTGraphQL',
      'History',
    ]);
  });
});
