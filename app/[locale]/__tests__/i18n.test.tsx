import { createInstance, i18n, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { describe, expect, it, Mock, vi } from 'vitest';
import initTranslations from '../../i18n';

vi.mock('i18next', () => ({
  createInstance: vi.fn(),
  initReactI18next: vi.fn(),
}));

vi.mock('i18next-resources-to-backend', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('react-i18next/initReactI18next', () => ({
  __esModule: true,
  initReactI18next: vi.fn(),
}));

vi.mock('../i18nConfig', () => ({
  __esModule: true,
  default: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
  },
}));

describe('initTranslations', () => {
  it('initializes with provided i18n instance', async () => {
    const mockI18nInstance = {
      use: vi.fn().mockReturnThis(),
      init: vi.fn().mockResolvedValue({}),
      services: {
        resourceStore: {
          data: {},
        },
      },
      t: vi.fn(),
    } as unknown as i18n;

    const result = await initTranslations('en', ['common'], mockI18nInstance);

    expect(mockI18nInstance.use).toHaveBeenCalledWith(initReactI18next);
    expect(mockI18nInstance.init).toHaveBeenCalledWith({
      lng: 'en',
      resources: undefined,
      fallbackLng: 'en',
      supportedLngs: ['en', 'ru'],
      defaultNS: 'common',
      fallbackNS: 'common',
      ns: ['common'],
      preload: ['en', 'ru'],
    });
    expect(result.i18n).toBe(mockI18nInstance);
  });

  it('initializes without provided i18n instance', async () => {
    const mockI18nInstance = {
      use: vi.fn().mockReturnThis(),
      init: vi.fn().mockResolvedValue({}),
      services: {
        resourceStore: {
          data: {},
        },
      },
      t: vi.fn(),
    } as unknown as i18n;

    (createInstance as Mock).mockReturnValue(mockI18nInstance);

    const result = await initTranslations('en', ['common']);

    expect(createInstance).toHaveBeenCalled();
    expect(mockI18nInstance.use).toHaveBeenCalledWith(initReactI18next);
    expect(mockI18nInstance.init).toHaveBeenCalledWith({
      lng: 'en',
      resources: undefined,
      fallbackLng: 'en',
      supportedLngs: ['en', 'ru'],
      defaultNS: 'common',
      fallbackNS: 'common',
      ns: ['common'],
      preload: ['en', 'ru'],
    });
    expect(result.i18n).toBe(mockI18nInstance);
  });

  it('initializes with provided resources', async () => {
    const mockI18nInstance = {
      use: vi.fn().mockReturnThis(),
      init: vi.fn().mockResolvedValue({}),
      services: {
        resourceStore: {
          data: {},
        },
      },
      t: vi.fn(),
    } as unknown as i18n;

    const mockResources: Resource = {
      en: {
        common: {
          key: 'value',
        },
      },
    };

    const result = await initTranslations('en', ['common'], mockI18nInstance, mockResources);

    expect(mockI18nInstance.use).toHaveBeenCalledWith(initReactI18next);
    expect(mockI18nInstance.init).toHaveBeenCalledWith({
      lng: 'en',
      resources: mockResources,
      fallbackLng: 'en',
      supportedLngs: ['en', 'ru'],
      defaultNS: 'common',
      fallbackNS: 'common',
      ns: ['common'],
      preload: [],
    });
    expect(result.i18n).toBe(mockI18nInstance);
  });

  it('initializes without provided resources', async () => {
    const mockI18nInstance = {
      use: vi.fn().mockReturnThis(),
      init: vi.fn().mockResolvedValue({}),
      services: {
        resourceStore: {
          data: {},
        },
      },
      t: vi.fn(),
    } as unknown as i18n;

    (createInstance as Mock).mockReturnValue(mockI18nInstance);

    const result = await initTranslations('en', ['common']);

    expect(createInstance).toHaveBeenCalled();
    expect(mockI18nInstance.use).toHaveBeenCalledWith(initReactI18next);
    expect(mockI18nInstance.use).toHaveBeenCalledWith(expect.any(Function));
    expect(mockI18nInstance.init).toHaveBeenCalledWith({
      lng: 'en',
      resources: undefined,
      fallbackLng: 'en',
      supportedLngs: ['en', 'ru'],
      defaultNS: 'common',
      fallbackNS: 'common',
      ns: ['common'],
      preload: ['en', 'ru'],
    });
    expect(result.i18n).toBe(mockI18nInstance);
  });
});
