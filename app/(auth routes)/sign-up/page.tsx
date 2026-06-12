'use client';
import { registerUser } from '@/lib/api/clientApi';
import css from './SignUp.module.css';
import { useMutation } from '@tanstack/react-query';
import useErrorApi from '@/hooks/useErrorApi';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();
  const { handleError, errorMessage } = useErrorApi();
  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push('/profile');
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const handleRegisterUser = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') return;
    const regData = {
      email,
      password,
    };
    mutate(regData);
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleRegisterUser}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            minLength={6}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
        {errorMessage && <p className={css.error}>{errorMessage}</p>}
      </form>
    </main>
  );
};

export default SignUp;
