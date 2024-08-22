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
  } = useForm<SignUpFormData>();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const { name, email, password } = data;
    await registerWithEmailAndPassword(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-up-form']}>
      <div className={styles['input-wrapper']}>
        <label>Enter your name:</label>
        <input className={styles.input} {...register('name', { required: true })} placeholder="Name" />
        {errors.email && <span>Email is required</span>}
      </div>
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
      <button type="submit">Sign up</button>
    </form>
  );
}
