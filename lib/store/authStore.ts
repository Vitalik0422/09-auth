import { UserData } from '@/types/user';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type authState = {
  isAuthenticated: boolean;
  user: UserData | null;
};

type authAction = {
  setUser: (user: UserData) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<authState & authAction>()(
  devtools(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user: user, isAuthenticated: true }),
      clearIsAuthenticated: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'authStore',
    },
  ),
);
