'use client';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const { data: user, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated.success) {
        const userData = await getMe();
        if (userData) return userData;
        else return null;
      } else return null;
    },
    retry: 0,
  });
  useEffect(() => {
    if (isLoading) return;
    if (user) {
      setUser(user);
    } else clearIsAuthenticated();
  }, [user, clearIsAuthenticated, setUser, isLoading]);

  return children;
};

export default AuthProvider;
