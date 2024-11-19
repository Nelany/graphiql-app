import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFound from './page';

describe('NotFound component', () => {
  it('renders the main container', () => {
    render(<NotFound />);
    const mainElement = screen.getByRole('heading', { name: /Ooops... Page not found!/i });
    expect(mainElement).toBeInTheDocument();
  });

  it('renders the Go to Main button', () => {
    render(<NotFound />);
    const buttonElement = screen.getByRole('button', { name: /Go to Main/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the link to the main page', () => {
    render(<NotFound />);
    const linkElement = screen.getByRole('link', { name: /Go to Main/i });
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
