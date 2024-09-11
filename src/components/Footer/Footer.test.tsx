import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('renders the footer correctly', () => {
    render(<Footer />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('contains GitHub links', () => {
    render(<Footer />);

    expect(screen.getByText('@Nelany')).toBeInTheDocument();
    expect(screen.getByText('@RemAntof')).toBeInTheDocument();
    expect(screen.getByText('@Oksana-bondareva')).toBeInTheDocument();
  });

  it('contains the year text', () => {
    render(<Footer />);

    expect(screen.getByText('© 2024')).toBeInTheDocument();
  });

  it('contains the RSS logo', () => {
    render(<Footer />);

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/rss-logo.svg');
    expect(logo).toHaveAttribute('width', '70');
    expect(logo).toHaveAttribute('height', '70');
  });
});
