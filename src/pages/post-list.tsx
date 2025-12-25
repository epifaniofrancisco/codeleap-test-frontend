import { PostCard } from "@/components/post-card";
import { usePosts } from "@/hooks/use-posts";
import type { Post } from "@/types";
import { Loader2 } from "lucide-react";

export const PostList = () => {
	const { data: posts, isLoading, isError } = usePosts();

	const postsData: Post[] = posts?.results || [];

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-12">
				<Loader2 className="w-8 h-8 text-primary animate-spin" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="bg-red-50 p-6 border border-red-200 rounded-lg text-center">
				<p className="font-medium text-red-800">
					Failed to load posts. Please try again later.
				</p>
			</div>
		);
	}

	if (!posts || postsData.length === 0) {
		return (
			<div className="bg-gray-50 p-8 border border-gray-200 rounded-lg text-center">
				<p className="text-gray-600">
					No posts yet. Be the first to share something!
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{postsData.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
};
