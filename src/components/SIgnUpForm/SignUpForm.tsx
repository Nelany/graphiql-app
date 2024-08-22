'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { registerWithEmailAndPassword } from '../../../firebase';
import styles from './SignUpForm.module.css';

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
  } = useForm<SignUpFormData>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const { name, email, password } = data;
    await registerWithEmailAndPassword(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-up-form']}>
      <div className={styles['input-wrapper']}>
        <label>Enter your name:</label>
        <input className={styles.input} {...register('name', { required: true })} placeholder="Name" />
        {errors.name && <span className={styles['error-validation']}>Name is required</span>}
      </div>
      <div className={styles['input-wrapper']}>
        <label>Enter your email:</label>
        <input
          className={styles.input}
          {...register('email', {
            required: 'Please, enter your email',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Enter your email in the format example@email.com',
            },
          })}
          placeholder="Email"
          type="text"
        />
        {errors.email && <span className={styles['error-validation']}>{errors.email.message}</span>}
      </div>
      <div className={styles['input-wrapper']}>
        <label>Enter your password:</label>
        <input
          className={styles.input}
          {...register('password', {
            required: 'Please, enter your password',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                'Password must be at least 8 characters long, contain one letter, one digit, and one special character',
            },
          })}
          placeholder="Password"
          autoComplete="off"
          type="password"
        />
        {errors.password && <span className={styles['error-validation']}>{errors.password.message}</span>}
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
}
