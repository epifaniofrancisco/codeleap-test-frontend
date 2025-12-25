import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../services/api";
import type { CreatePostDto, UpdatePostDto } from "@/types/index";

export const usePosts = () => {
	return useQuery({
		queryKey: ["posts"],
		queryFn: postsApi.getPosts,
	});
};

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (post: CreatePostDto) => postsApi.createPost(post),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};

export const useUpdatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: UpdatePostDto }) =>
			postsApi.updatePost(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => postsApi.deletePost(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};
