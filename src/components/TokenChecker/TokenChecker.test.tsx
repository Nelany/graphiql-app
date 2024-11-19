import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { describe, expect, it, Mock, vi } from 'vitest';
import TokenChecker from './TokenChecker';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('../../../firebase', () => ({
  auth: {},
}));

describe('TokenChecker component', () => {
  const mockPush = vi.fn();
  const mockUseRouter = useRouter as Mock;
  const mockUsePathname = usePathname as Mock;
  const mockUseAuthState = useAuthState as Mock;

  beforeEach(() => {
    vi.resetAllMocks();
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUsePathname.mockReturnValue('/en/SignIn');
  });

  it('renders the children when loading', () => {
    mockUseAuthState.mockReturnValue([null, true, null]);

    render(
      <TokenChecker>
        <div>Child Component</div>
      </TokenChecker>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('redirects to home if user is authenticated and token is valid', async () => {
    const mockUser = {
      getIdTokenResult: vi.fn().mockResolvedValue({
        expirationTime: new Date(Date.now() + 10000).toISOString(),
      }),
    };
    mockUseAuthState.mockReturnValue([mockUser, false, null]);
    mockUsePathname.mockReturnValue('/en/SignIn');

    render(
      <TokenChecker>
        <div>Child Component</div>
      </TokenChecker>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('redirects to sign-in if user is not authenticated or token is invalid', async () => {
    mockUseAuthState.mockReturnValue([null, false, null]);
    mockUsePathname.mockReturnValue('/dashboard');

    render(
      <TokenChecker>
        <div>Child Component</div>
      </TokenChecker>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('throws an error if there is an authentication error', () => {
    const mockError = new Error('Authentication error');
    mockUseAuthState.mockReturnValue([null, false, mockError]);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(
        <TokenChecker>
          <div>Child Component</div>
        </TokenChecker>
      );
    }).toThrow('Authentication error');

    consoleErrorSpy.mockRestore();
  });
});
