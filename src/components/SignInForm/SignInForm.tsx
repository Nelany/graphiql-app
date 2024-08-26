'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logInWithEmailAndPassword } from '../../../firebase';
import styles from './SignInForm.module.css';

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
    const signInResponse = await logInWithEmailAndPassword(email, password);
    if (signInResponse instanceof Error) {
      toast.error(signInResponse.message);
      return;
    }
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
