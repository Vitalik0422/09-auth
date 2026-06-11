'use client';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname();
  const isFirstPathnameRender = useRef(true);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const session = await checkSession();

      if (!session.success) return null;

      const userData = await getMe();
      return userData ?? null;
    },
    retry: 0,
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: 'always',
  });

  useEffect(() => {
    if (isFirstPathnameRender.current) {
      isFirstPathnameRender.current = false;
      return;
    }
    void refetch();
  }, [pathname, refetch]);

  useEffect(() => {
    if (isLoading) return;
    if (user) {
      setUser(user);
    } else clearIsAuthenticated();
  }, [user, clearIsAuthenticated, setUser, isLoading]);

  return children;
};

export default AuthProvider;
