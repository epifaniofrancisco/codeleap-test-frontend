import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import { PostFilters } from "@/components/post-filters";
import { useInfinitePosts } from "@/hooks/use-posts";
import { useLikesStore } from "@/store/post-likes-store";
import { useUserStore } from "@/store/user-store";
import type { FilterOption, Post, SortOption } from "@/types";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

export const PostList = () => {
	const {
		data,
		isLoading,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfinitePosts();

	const posts: Post[] = useMemo(
		() => data?.pages.flatMap((page) => page.results) ?? [],
		[data]
	);

	const username = useUserStore((state) => state.username);
	const { getLikeCount, hasUserLiked } = useLikesStore();

	const [sortBy, setSortBy] = useState<SortOption>("recent");
	const [filterBy, setFilterBy] = useState<FilterOption>("all");
	const [searchTerm, setSearchTerm] = useState<string>("");

	const allUsernames = Array.from(
		new Set(posts.map((post) => post.username))
	);

	const filteredAndSortedPosts = useMemo(() => {
		let filtered = [...posts];
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
		posts,
		sortBy,
		filterBy,
		username,
		getLikeCount,
		hasUserLiked,
		searchTerm,
	]);

	const { observerTarget } = useInfiniteScroll(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	});

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

	if (!data || posts.length === 0) {
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
			<ScrollArea className="h-[70vh] w-full pr-4">
				<div className="space-y-6">
					{filteredAndSortedPosts.map((post) => (
						<PostCard
							key={post.id}
							post={post}
							allUsernames={allUsernames}
						/>
					))}
					{hasNextPage && (
						<div
							ref={observerTarget}
							className="flex justify-center py-4"
						>
							<Loader2 className="w-8 h-8 text-primary animate-spin" />
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
};
