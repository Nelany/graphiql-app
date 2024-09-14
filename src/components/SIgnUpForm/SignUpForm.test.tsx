import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { describe, expect, it, Mock, vi } from 'vitest';
import { registerWithEmailAndPassword } from '../../../firebase';
import SignUpForm from './SignUpForm';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../../../firebase', () => ({
  registerWithEmailAndPassword: vi.fn(),
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

describe('SignUpForm component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useRouter as Mock).mockReturnValue({ push: mockPush });
  });

  it('renders the form with initial state', () => {
    render(<SignUpForm />);

    expect(screen.getByPlaceholderText('forms:placeholderName')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('forms:placeholderEmail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('forms:placeholderPassword')).toBeInTheDocument();
    expect(screen.getByText('signUp:buttonSignUpForm')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    (registerWithEmailAndPassword as Mock).mockResolvedValue({});

    render(<SignUpForm />);

    fireEvent.change(screen.getByPlaceholderText('forms:placeholderName'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('forms:placeholderEmail'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('forms:placeholderPassword'), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByText('signUp:buttonSignUpForm'));

    await waitFor(() => {
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith('John Doe', 'john@example.com', 'Password1!');
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('displays validation errors', async () => {
    render(<SignUpForm />);

    fireEvent.click(screen.getByText('signUp:buttonSignUpForm'));

    await waitFor(() => {
      expect(screen.getByText('forms:nameRequired')).toBeInTheDocument();
      expect(screen.getByText('forms:emailRequired')).toBeInTheDocument();
      expect(screen.getByText('forms:passwordRequired')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('forms:placeholderEmail'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText('forms:placeholderPassword'), { target: { value: 'short' } });

    fireEvent.click(screen.getByText('signUp:buttonSignUpForm'));

    await waitFor(() => {
      expect(screen.getByText('forms:emailValidate')).toBeInTheDocument();
      expect(screen.getByText('forms:passwordValidate')).toBeInTheDocument();
    });
  });

  it('displays error toast on registration failure', async () => {
    const errorMessage = 'Registration failed';
    (registerWithEmailAndPassword as Mock).mockResolvedValue(new Error(errorMessage));

    render(<SignUpForm />);

    fireEvent.change(screen.getByPlaceholderText('forms:placeholderName'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('forms:placeholderEmail'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('forms:placeholderPassword'), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByText('signUp:buttonSignUpForm'));

    await waitFor(() => {
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith('John Doe', 'john@example.com', 'Password1!');
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
