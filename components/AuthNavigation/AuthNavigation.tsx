import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
const AuthNavigation = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const user = useAuthStore((state) => state.user);

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push('/');
      clearIsAuthenticated();
    },
  });
  const handleLogout = () => {
    mutate();
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
          <li>
            <Link href="/profile" prefetch={false}>
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user!.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
