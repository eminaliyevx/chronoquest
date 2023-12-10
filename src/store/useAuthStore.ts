import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../interfaces";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  setAccessToken: (accessToken: string | null) => void;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      loading: true,
      setAccessToken: (accessToken) => set({ accessToken, loading: true }),
      setUser: (user) => set({ user, loading: false }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
);

export default useAuthStore;
