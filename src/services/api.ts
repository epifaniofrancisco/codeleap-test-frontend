import axios from "axios";
import type { Post, CreatePostDto, UpdatePostDto } from "@/types/index";

const API_BASE_URL = "https://dev.codeleap.co.uk/careers/";

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const postsApi = {
	getPosts: async (): Promise<{ results: Post[] }> => {
		const { data } = await api.get("");
		return data;
	},

	createPost: async (post: CreatePostDto): Promise<Post> => {
		const { data } = await api.post("", post);
		return data;
	},

	updatePost: async (id: number, post: UpdatePostDto): Promise<Post> => {
		const { data } = await api.patch(`${id}/`, post);
		return data;
	},

	deletePost: async (id: number): Promise<void> => {
		await api.delete(`${id}/`);
	},
};
