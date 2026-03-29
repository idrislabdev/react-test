import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IAuthState } from "@/features/auth/types";

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) =>
        set({
          user,
          isLoggedIn: !!user,
        }),
      logOut: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: "user_session", // nama di localStorage
    },
  ),
);
