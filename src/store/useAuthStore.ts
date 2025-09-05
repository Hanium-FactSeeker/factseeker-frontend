'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthState, MeResponse } from '@/types/auth';

import { loginUser } from '@/apis/auth/login';
import { fetchMe as fetchMeApi } from '@/apis/auth/fetchMe';
import { logoutApi } from '@/apis/auth/logout';
import { clearTokens, getAccessToken } from '@/lib/auth/tokens';

const isClient = () => typeof window !== 'undefined';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,

      init: async () => {
        if (!isClient()) return;
        const token = getAccessToken();
        if (!token) {
          set({ isLoggedIn: false, user: null });
          return;
        }
        try {
          const me = await fetchMeApi();
          set({ user: me, isLoggedIn: true });
        } catch {
          await get().logout();
        }
      },

      setUser: (user: MeResponse | null) => set({ user }),

      loginWithCredentials: async (loginId: string, password: string) => {
        await loginUser({ loginId, password });
        const me = await fetchMeApi();
        set({ user: me, isLoggedIn: true });
      },

      logout: async () => {
        try {
          await logoutApi();
        } catch {
        } finally {
          clearTokens();
          set({ isLoggedIn: false, user: null });
        }
      },

      fetchMe: async () => {
        const me = await fetchMeApi();
        set({ user: me, isLoggedIn: true });
        return me;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => (isClient() ? sessionStorage : (undefined as any))),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    },
  ),
);
