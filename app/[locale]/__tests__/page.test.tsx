import '@testing-library/jest-dom';
import { vi } from 'vitest';
import initTranslations from '../../i18n';
import Home from '../page';

vi.mock('../../i18n', () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve({ t: (key: string) => key })),
}));

describe('Home component', () => {
  it('calls initTranslations with the correct parameters', async () => {
    const locale = 'en';
    await Home({ params: { locale } });

    expect(initTranslations).toHaveBeenCalledWith(locale, ['home']);
  });
});
