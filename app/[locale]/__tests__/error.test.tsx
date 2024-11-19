import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GlobalError from '../../error';

describe('GlobalError component', () => {
  it('renders the main container', () => {
    const error = new Error('Test error message');
    render(<GlobalError error={error} />);
    const mainElement = screen.getByText('Something went wrong!');
    expect(mainElement).toBeInTheDocument();
  });

  it('renders the reload message', () => {
    const error = new Error('Test error message');
    render(<GlobalError error={error} />);
    const reloadMessage = screen.getByText('Reload the application please!');
    expect(reloadMessage).toBeInTheDocument();
  });

  it('renders the error message', () => {
    const error = new Error('Test error message');
    render(<GlobalError error={error} />);
    const errorMessage = screen.getByText('Test error message');
    expect(errorMessage).toBeInTheDocument();
  });
});
