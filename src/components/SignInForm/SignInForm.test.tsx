import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { describe, expect, it, Mock, vi } from 'vitest';
import { logInWithEmailAndPassword } from '../../../firebase';
import SignInForm from './SignInForm';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../../../firebase', () => ({
  logInWithEmailAndPassword: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('SignInForm component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useRouter as Mock).mockReturnValue({ push: mockPush });
  });

  it('renders the form with initial state', () => {
    render(<SignInForm />);

    expect(screen.getByPlaceholderText('forms:placeholderEmail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('forms:placeholderPassword')).toBeInTheDocument();
    expect(screen.getByText('signIn:buttonSignInForm')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    (logInWithEmailAndPassword as Mock).mockResolvedValue({});

    render(<SignInForm />);

    fireEvent.change(screen.getByPlaceholderText('forms:placeholderEmail'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('forms:placeholderPassword'), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByText('signIn:buttonSignInForm'));

    await waitFor(() => {
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith('john@example.com', 'Password1!');
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('displays validation errors', async () => {
    render(<SignInForm />);

    fireEvent.click(screen.getByText('signIn:buttonSignInForm'));

    await waitFor(() => {
      expect(screen.getByText('forms:emailRequired')).toBeInTheDocument();
      expect(screen.getByText('forms:passwordRequired')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('forms:placeholderEmail'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText('forms:placeholderPassword'), { target: { value: 'short' } });

    fireEvent.click(screen.getByText('signIn:buttonSignInForm'));

    await waitFor(() => {
      expect(screen.getByText('forms:emailValidate')).toBeInTheDocument();
      expect(screen.getByText('forms:passwordValidate')).toBeInTheDocument();
    });
  });

  it('displays error toast on login failure', async () => {
    const errorMessage = 'Login failed';
    (logInWithEmailAndPassword as Mock).mockResolvedValue(new Error(errorMessage));

    render(<SignInForm />);

    fireEvent.change(screen.getByPlaceholderText('forms:placeholderEmail'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('forms:placeholderPassword'), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByText('signIn:buttonSignInForm'));

    await waitFor(() => {
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith('john@example.com', 'Password1!');
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
