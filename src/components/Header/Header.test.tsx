import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from './Header';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

vi.mock('@/components/LanguageChanger/LanguageChanger', () => ({
  __esModule: true,
  default: () => <div>LanguageChanger</div>,
}));

vi.mock('../NavButton/NavButton', () => ({
  __esModule: true,
  NavButton: ({ text }: { isUser: boolean; rout?: string; text: string }) => <button>{text}</button>,
}));

describe('Header component', () => {
  it('renders the main container with initial state', () => {
    render(<Header />);

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('home:buttonSignIn')).toBeInTheDocument();
    expect(screen.getByText('home:buttonSignUp')).toBeInTheDocument();
    expect(screen.getByText('Header:logOut')).toBeInTheDocument();
    expect(screen.getByText('Header:home')).toBeInTheDocument();
    expect(screen.getByText('LanguageChanger')).toBeInTheDocument();
  });

  it('changes state to sticky on scroll', () => {
    render(<Header />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(document.querySelector('header')).toHaveClass('_sticky_63c2ea');

    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(document.querySelector('header')).not.toHaveClass('_sticky_63c2ea');
  });

  it('contains all elements', () => {
    render(<Header />);

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('home:buttonSignIn')).toBeInTheDocument();
    expect(screen.getByText('home:buttonSignUp')).toBeInTheDocument();
    expect(screen.getByText('Header:logOut')).toBeInTheDocument();
    expect(screen.getByText('Header:home')).toBeInTheDocument();
    expect(screen.getByText('LanguageChanger')).toBeInTheDocument();
  });
});
