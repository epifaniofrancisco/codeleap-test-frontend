export interface Post {
	id: number;
	username: string;
	created_datetime: string;
	title: string;
	content: string;
}

export interface CreatePostDto {
	username: string;
	title: string;
	content: string;
}

export interface UpdatePostDto {
	title: string;
	content: string;
}

export type SortOption = "recent" | "oldest" | "most-liked";
export type FilterOption = "all" | "my-posts" | "liked";

export interface Comment {
	id: string;
	postId: number;
	username: string;
	content: string;
	created_datetime: string;
}

export interface CreateCommentDto {
	postId: number;
	username: string;
	content: string;
}