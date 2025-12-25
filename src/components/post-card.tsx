import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";
import type { Post } from "@/types";
import { formatDate } from "@/utils";

interface PostCardProps {
	post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
	const currentUsername = useUserStore((state) => state.username);

	const isOwner = currentUsername === post.username;

	return (
		<Card className="pt-0 border">
			<CardHeader className="flex justify-between items-center bg-primary py-6 rounded-t-lg text-white">
				<CardTitle className="font-bold text-[22px]">
					{post.title}
				</CardTitle>

				{isOwner && (
					<div className="flex gap-5">
						<Button
							onClick={() => {}}
							className="p-0 w-8 h-8 cursor-pointer"
							aria-label="Delete post"
						>
							<img
								src="/icons/delete.svg"
								alt="Delete post Svg"
								className="bg-cover w-7 h-7"
							/>
						</Button>

						<Button
							onClick={() => {}}
							className="p-0 w-8 h-8 cursor-pointer"
							aria-label="Edit post"
						>
							<img
								src="/icons/edit.svg"
								alt="Edit post Svg"
								className="bg-cover w-7 h-7"
							/>
						</Button>
					</div>
				)}
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="flex justify-between items-center text-input-border text-base">
					<span className="font-bold">@{post.username}</span>
					<span>{formatDate(post.created_datetime)}</span>
				</div>

				<p className="text-gray-800 text-base wrap-break-word whitespace-pre-wrap">
					{post.content}
				</p>
			</CardContent>
		</Card>
	);
};
