import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
	username: string | null;
	setUsername: (username: string) => void;
	clearUsername: () => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			username: null,
			setUsername: (username) => set({ username }),
			clearUsername: () => set({ username: null }),
		}),
		{
			name: "codeleap-user-storage",
		}
	)
);
