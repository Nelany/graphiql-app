'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { registerWithEmailAndPassword } from '../../../firebase';
import styles from './SignUpForm.module.css';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

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

  const router = useRouter();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const { name, email, password } = data;
    await registerWithEmailAndPassword(name, email, password);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-up-form']}>
      <div className={styles['input-wrapper']}>
        <label>{t('forms:name')}</label>
        <input
          className={styles.input}
          {...register('name', { required: true })}
          placeholder={t('forms:placeholderName')}
        />
        {errors.name && <span className={styles['error-validation']}>{t('forms:nameRequired')}</span>}
      </div>
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
      <button type="submit">{t('signUp:buttonSignUpForm')}</button>
    </form>
  );
}
