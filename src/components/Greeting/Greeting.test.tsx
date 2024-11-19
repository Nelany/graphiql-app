import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Mock, vi } from 'vitest';
import { Greeting } from './Greeting';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Greeting component', () => {
  it('renders loading state correctly', () => {
    (useAuthState as Mock).mockReturnValue([null, true]);

    render(<Greeting />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders greeting with user display name', async () => {
    const user = { displayName: 'John Doe' };
    (useAuthState as Mock).mockReturnValue([user, false]);

    render(<Greeting />);

    await waitFor(() => {
      expect(screen.getByText('home:greetingJohn Doe!')).toBeInTheDocument();
    });
  });

  it('renders header when user is not authenticated', () => {
    (useAuthState as Mock).mockReturnValue([null, false]);

    render(<Greeting />);

    expect(screen.getByText('home:header')).toBeInTheDocument();
  });

  it('checks for user display name periodically', async () => {
    const user = { displayName: null };
    (useAuthState as Mock).mockReturnValue([user, false]);

    render(<Greeting />);

    await waitFor(() => {
      expect(screen.getByText('home:header')).toBeInTheDocument();
    });
  });
});
