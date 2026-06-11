'use client';
import { useMutation } from '@tanstack/react-query';
import css from './SignIn.module.css';
import { login } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import useErrorApi from '@/hooks/useErrorApi';

const SignInPage = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const { handleError, errorMessage } = useErrorApi();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      router.push('/profile');
      setUser(data);
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const handleLoginUser = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const logUserData = {
      email: String(formData.get('email')).trim(),
      password: String(formData.get('password')).trim(),
    };
    mutate(logUserData);
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleLoginUser}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            title="Enter an email in the format name@example.com"
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
            required
            minLength={6}
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {errorMessage && <p className={css.error}>{errorMessage}</p>}
      </form>
    </main>
  );
};

export default SignInPage;
