'use client';

import { useTranslation } from 'react-i18next';
import styles from './SignInForm.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { logInWithEmailAndPassword } from '../../../firebase';

export interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const { email, password } = data;
    await logInWithEmailAndPassword(email, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-in-form']}>
      <div className={styles['input-wrapper']}>
        <label>Enter your email:</label>
        <input className={styles.input} {...register('email', { required: true })} placeholder="Email" />
        {errors.email && <span>Email is required</span>}
      </div>
      <div className={styles['input-wrapper']}>
        <label>Enter your password:</label>
        <input
          className={styles.input}
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <span>Password is required</span>}
      </div>
      <button type="submit">Sign in</button>
    </form>
  );
}
