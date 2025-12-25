import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LikesState {
	globalLikes: Record<number, Set<string>>;
	toggleLike: (postId: number, username: string) => void;
	getLikeCount: (postId: number) => number;
	hasUserLiked: (postId: number, username: string) => boolean;
}

export const useLikesStore = create<LikesState>()(
	persist(
		(set, get) => ({
			globalLikes: {},

			toggleLike: (postId: number, username: string) => {
				set((state) => {
					const newGlobalLikes = { ...state.globalLikes };
					const postLikes = new Set(newGlobalLikes[postId] || []);

					if (postLikes.has(username)) {
						postLikes.delete(username);
					} else {
						postLikes.add(username);
					}

					newGlobalLikes[postId] = postLikes;
					return { globalLikes: newGlobalLikes };
				});
			},

			getLikeCount: (postId: number) => {
				const postLikes = get().globalLikes[postId];
				return postLikes ? postLikes.size : 0;
			},

			hasUserLiked: (postId: number, username: string) => {
				const postLikes = get().globalLikes[postId];
				return postLikes ? postLikes.has(username) : false;
			},
		}),
		{
			name: "codeleap-global-likes-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				globalLikes: Object.entries(state.globalLikes).reduce(
					(acc, [postId, likes]) => {
						acc[Number(postId)] = Array.from(likes);
						return acc;
					},
					{} as Record<number, string[]>
				),
			}),
			onRehydrateStorage: () => (state) => {
				if (state) {
					const rehydratedLikes: Record<number, Set<string>> = {};
					Object.entries(state.globalLikes).forEach(
						([postId, likes]) => {
							rehydratedLikes[Number(postId)] = new Set(
								likes as unknown as string[]
							);
						}
					);
					state.globalLikes = rehydratedLikes;
				}
			},
		}
	)
);
