import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import SignIn from './page';
import initTranslations from '../../i18n';

vi.mock('../../i18n', () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve({ t: (key: string) => key })),
}));

describe('SignIn component', () => {
  it('calls initTranslations with the correct parameters', async () => {
    const locale = 'en';
    await SignIn({ params: { locale } });

    expect(initTranslations).toHaveBeenCalledWith(locale, ['signIn']);
  });
});
