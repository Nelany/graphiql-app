import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import initTranslations from '../../i18n';
import SignUp from './page';

vi.mock('../../i18n', () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve({ t: (key: string) => key })),
}));

describe('SignUp component', () => {
  it('calls initTranslations with the correct parameters', async () => {
    const locale = 'en';
    await SignUp({ params: { locale } });

    expect(initTranslations).toHaveBeenCalledWith(locale, ['signUp']);
  });
});
