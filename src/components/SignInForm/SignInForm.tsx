'use client';

import { useTranslation } from 'react-i18next';
import styles from './SignInForm.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { logInWithEmailAndPassword } from '../../../firebase';
import { useRouter } from 'next/navigation';

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ mode: 'onChange' });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const { email, password } = data;
    await logInWithEmailAndPassword(email, password);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-in-form']}>
      <div className={styles['input-wrapper']}>
        <label>{t('forms:email')}</label>
        <input
          className={styles.input}
          {...register('email', {
            required: t('forms:emailRequired'),
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: t('forms:emailValidate'),
            },
          })}
          placeholder={t('forms:placeholderEmail')}
          type="text"
        />
        {errors.email && <span className={styles['error-validation']}>{errors.email.message}</span>}
      </div>
      <div className={styles['input-wrapper']}>
        <label>{t('forms:password')}</label>
        <input
          className={styles.input}
          {...register('password', {
            required: t('forms:passwordRequired'),
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: t('forms:passwordValidate'),
            },
          })}
          placeholder={t('forms:placeholderPassword')}
          autoComplete="off"
          type="password"
        />
        {errors.password && <span className={styles['error-validation']}>{errors.password.message}</span>}
      </div>
      <button type="submit">{t('signIn:buttonSignInForm')}</button>
    </form>
  );
}
