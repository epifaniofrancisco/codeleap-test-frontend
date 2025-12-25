import { Button } from "@/components/ui/button";
import { useLikesStore } from "@/store/post-likes-store";
import { useUserStore } from "@/store/user-store";
import { Heart } from "lucide-react";

interface LikeButtonProps {
	postId: number;
}

export const LikeButton = ({ postId }: LikeButtonProps) => {
	const username = useUserStore((state) => state.username);
	const { toggleLike, getLikeCount, hasUserLiked } = useLikesStore();

	if (!username) return null;

	const likeCount = getLikeCount(postId);
	const isLiked = hasUserLiked(postId, username);

	const handleLike = () => {
		toggleLike(postId, username);
	};

	return (
		<div className="flex items-center gap-2">
			<Button
				variant="ghost"
				size="sm"
				onClick={handleLike}
				className={`flex items-center gap-2 transition-all cursor-pointer ${
					isLiked
						? "text-red-600 hover:text-red-700 hover:bg-red-50"
						: "text-gray-600 hover:text-red-600 hover:bg-gray-50"
				}`}
				aria-label={isLiked ? "Unlike post" : "Like post"}
			>
				<Heart
					className={` ${isLiked ? "fill-red-500 text-red-500" : ""}`}
				/>
				<span className="text-sm font-medium">{likeCount}</span>
			</Button>
		</div>
	);
};
