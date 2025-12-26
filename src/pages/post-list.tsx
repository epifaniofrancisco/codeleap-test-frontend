import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import { PostFilters } from "@/components/post-filters";
import { usePosts } from "@/hooks/use-posts";
import { useLikesStore } from "@/store/post-likes-store";
import { useUserStore } from "@/store/user-store";
import type { FilterOption, Post, SortOption } from "@/types";
import { Loader2 } from "lucide-react";

export const PostList = () => {
	const { data: posts, isLoading, isError } = usePosts();
	const username = useUserStore((state) => state.username);
	const { getLikeCount, hasUserLiked } = useLikesStore();

	const [sortBy, setSortBy] = useState<SortOption>("recent");
	const [filterBy, setFilterBy] = useState<FilterOption>("all");
	const [searchTerm, setSearchTerm] = useState<string>("");

	const postsData: Post[] = useMemo(() => posts?.results || [], [posts]);

	const allUsernames = Array.from(
		new Set(
			postsData?.map((post: { username: string }) => post.username) || []
		)
	);

	const filteredAndSortedPosts = useMemo(() => {
		if (!postsData) return [];

		let filtered = [...postsData];

		if (searchTerm.trim() !== "") {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(post) =>
					post.title.toLowerCase().includes(term) ||
					post.content.toLowerCase().includes(term)
			);
		}

		if (filterBy === "my-posts") {
			filtered = filtered.filter((post) => post.username === username);
		} else if (filterBy === "liked") {
			filtered = filtered.filter((post) =>
				hasUserLiked(post.id, username || "")
			);
		}

		if (sortBy === "recent") {
			filtered.sort(
				(a, b) =>
					new Date(b.created_datetime).getTime() -
					new Date(a.created_datetime).getTime()
			);
		} else if (sortBy === "oldest") {
			filtered.sort(
				(a, b) =>
					new Date(a.created_datetime).getTime() -
					new Date(b.created_datetime).getTime()
			);
		} else if (sortBy === "most-liked") {
			filtered.sort((a, b) => getLikeCount(b.id) - getLikeCount(a.id));
		}

		return filtered;
	}, [
		postsData,
		sortBy,
		filterBy,
		username,
		getLikeCount,
		hasUserLiked,
		searchTerm,
	]);

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
			<PostFilters
				sortBy={sortBy}
				filterBy={filterBy}
				onSortChange={setSortBy}
				onFilterChange={setFilterBy}
				searchTerm={searchTerm}
				onSearchTermChange={setSearchTerm}
			/>

			{filteredAndSortedPosts.length === 0 ? (
				<div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
					<p className="text-gray-600 font-medium">
						No posts found with current filters.
					</p>
				</div>
			) : (
				<div className="space-y-6">
					{filteredAndSortedPosts.map((post) => (
						<PostCard
							key={post.id}
							post={post}
							allUsernames={allUsernames}
						/>
					))}
				</div>
			)}
		</div>
	);
};
