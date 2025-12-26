import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { postsApi } from "../services/api";
import type { CreatePostDto, PostsResponse, UpdatePostDto } from "@/types/index";

export const useInfinitePosts = () => {
	return useInfiniteQuery<PostsResponse, Error>({
		queryKey: ["posts"],
		queryFn: postsApi.getPosts,
		getNextPageParam: (lastPage) => lastPage?.next,
		initialPageParam: "",
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
