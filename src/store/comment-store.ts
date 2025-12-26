import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Comment, CreateCommentDto } from "@/types/index";

interface CommentsState {
	comments: Comment[];
	addComment: (comment: CreateCommentDto) => void;
	deleteComment: (commentId: string) => void;
	getCommentsByPost: (postId: number) => Comment[];
    getCommentCount: (postId: number) => number;
    removeCommentsByPostId: (postId: number) => void;
}

export const useCommentsStore = create<CommentsState>()(
	persist(
		(set, get) => ({
			comments: [],

			addComment: (commentData: CreateCommentDto) => {
				const newComment: Comment = {
					id: `comment-${Date.now()}-${Math.random()}`,
					...commentData,
					created_datetime: new Date().toISOString(),
				};

				set((state) => ({
					comments: [newComment, ...state.comments],
				}));
			},

			deleteComment: (commentId: string) => {
				set((state) => ({
					comments: state.comments.filter((c) => c.id !== commentId),
				}));
			},

			getCommentsByPost: (postId: number) => {
				return get()
					.comments.filter((c) => c.postId === postId)
					.sort(
						(a, b) =>
							new Date(b.created_datetime).getTime() -
							new Date(a.created_datetime).getTime()
					);
			},

			getCommentCount: (postId: number) => {
				return get().comments.filter((c) => c.postId === postId).length;
			},

			removeCommentsByPostId: (postId: number) => {
				set((state) => ({
					comments: state.comments.filter((c) => c.postId !== postId),
				}));
			},
		}),
		{
			name: "codeleap-comments-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
