import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/store/user-store";
import { useCommentsStore } from "@/store/comment-store";
import { formatDate } from "@/utils";
import { MessageCircle, Trash2 } from "lucide-react";
import { MentionText } from "@/components/mention-text";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError } from "./ui/field";

const commentSchema = z.object({
	content: z
		.string()
		.min(1, "Comment cannot be empty")
		.max(500, "Comment must be at most 500 characters"),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentsSectionProps {
	postId: number;
	allUsernames: string[];
	showComments: boolean;
}

interface CommentsSectionButtonProps {
	postId: number;
	showComments: boolean;
	setShowComments: (show: boolean) => void;
}

export const CommentsSectionButton = ({
	postId,
	showComments,
	setShowComments,
}: CommentsSectionButtonProps) => {
	const commentsCount = useCommentsStore(
		(state) => state.getCommentsByPost(postId).length
	);
	return (
		<Button
			variant="ghost"
			onClick={() => setShowComments(!showComments)}
			className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
			aria-expanded={showComments}
		>
			<MessageCircle />
			{commentsCount}
		</Button>
	);
};

export const CommentsSection = ({
	postId,
	allUsernames,
	showComments,
}: CommentsSectionProps) => {
	const username = useUserStore((state) => state.username);
	const { addComment, deleteComment, getCommentsByPost } = useCommentsStore();
	const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

	const comments = getCommentsByPost(postId);

	const form = useForm<CommentFormData>({
		resolver: zodResolver(commentSchema),
		defaultValues: { content: "" },
	});

	const onSubmit = (data: CommentFormData) => {
		if (!username) return;

		addComment({
			postId,
			username,
			content: data.content.trim(),
		});

		form.reset();
	};

	const handleDelete = (commentId: string) => {
		setCommentToDelete(commentId);
	};

	const confirmDelete = () => {
		if (commentToDelete) {
			deleteComment(commentToDelete);
			setCommentToDelete(null);
		}
	};

	if (!showComments) return null;

	return (
		<div
			className="w-full space-y-3 animate-slide-up"
			id={`comments-list-${postId}`}
		>
			<Dialog
				open={!!commentToDelete}
				onOpenChange={() => setCommentToDelete(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Comment</DialogTitle>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setCommentToDelete(null)}
							className="cursor-pointer"
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={confirmDelete}
							className="cursor-pointer"
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Card className="p-4 bg-white">
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-2"
					autoComplete="off"
				>
					<Field data-invalid={!!form.formState.errors.content}>
						<Textarea
							{...form.register("content")}
							id="comment-content"
							placeholder="Write a comment... Use @username to mention"
							rows={2}
							className={`text-sm resize-none focus-visible:ring-1 ${
								form.formState.errors.content
									? "border-red-500 focus-visible:ring-red-500"
									: "border-input-border"
							}`}
							maxLength={500}
							aria-invalid={!!form.formState.errors.content}
						/>
						{form.formState.errors.content && (
							<FieldError
								errors={[form.formState.errors.content]}
							/>
						)}
					</Field>
					<div className="flex justify-end">
						<Button
							type="submit"
							size="sm"
							disabled={!form.watch("content")?.trim()}
							className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer text-xs"
						>
							Comment
						</Button>
					</div>
				</form>
			</Card>

			<div className="space-y-2">
				{comments.map((comment) => (
					<Card key={comment.id} className="p-3 bg-gray-50">
						<div className="flex items-start justify-between gap-2">
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<span className="text-xs font-bold text-gray-800">
										@{comment.username}
									</span>
									<span className="text-xs text-gray-500">
										{formatDate(comment.created_datetime)}
									</span>
								</div>
								<p className="text-sm text-gray-700 wrap-break-word">
									<MentionText
										text={comment.content}
										validUsernames={allUsernames}
									/>
								</p>
							</div>
							{username === comment.username && (
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleDelete(comment.id)}
									className="text-red-500 hover:text-red-700 cursor-pointer "
									aria-label="Delete comment"
								>
									<Trash2 />
								</Button>
							)}
						</div>
					</Card>
				))}
			</div>
		</div>
	);
};
