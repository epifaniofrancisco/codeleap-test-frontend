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
