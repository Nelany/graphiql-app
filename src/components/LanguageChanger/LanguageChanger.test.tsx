import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { describe, expect, it, Mock, vi } from 'vitest';
import LanguageChanger from './LanguageChanger';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

describe('LanguageChanger component', () => {
  const mockPush = vi.fn();
  const mockRefresh = vi.fn();
  const mockUseRouter = useRouter as Mock;
  const mockUsePathname = usePathname as Mock;
  const mockUseTranslation = useTranslation as Mock;

  beforeEach(() => {
    vi.resetAllMocks();
    mockUseRouter.mockReturnValue({ push: mockPush, refresh: mockRefresh });
    mockUsePathname.mockReturnValue('/en/some-path');
    mockUseTranslation.mockReturnValue({ i18n: { language: 'en' } });
  });

  it('renders the select element with initial language', () => {
    render(<LanguageChanger />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('en');
  });

  it('changes language and updates path on selection change', () => {
    render(<LanguageChanger />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'ru' } });

    expect(document.cookie).toContain('NEXT_LOCALE=ru');
    expect(mockPush).toHaveBeenCalledWith('/ru/some-path');
    expect(mockRefresh).toHaveBeenCalled();
  });
});
