'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { auth, registerWithEmailAndPassword } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const registerUser = (data: { name: string; email: string; password: string }) => {
    const { name, email, password } = data;
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <input {...register('name', { required: true })} placeholder="Name" />
      {errors.name && <span>Name is required</span>}

      <input {...register('email', { required: true })} placeholder="Email" />
      {errors.email && <span>Email is required</span>}

      <input {...register('password', { required: true })} type="password" placeholder="Password" />
      {errors.password && <span>Password is required</span>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
