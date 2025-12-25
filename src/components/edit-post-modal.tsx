import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUpdatePost } from "@/hooks/use-posts";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { Post, UpdatePostDto } from "@/types/index";

const editPostSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title must be at most 100 characters"),
	content: z
		.string()
		.min(1, "Content is required")
		.max(5000, "Content must be at most 5000 characters"),
});

type EditPostFormData = z.infer<typeof editPostSchema>;

interface EditModalProps {
	post: Post;
	onClose: () => void;
}

export const EditPostModal = ({ post, onClose }: EditModalProps) => {
	const { mutate: updatePost, isPending } = useUpdatePost();

	const form = useForm<EditPostFormData>({
		resolver: zodResolver(editPostSchema),
		mode: "onChange",
		defaultValues: {
			title: post.title,
			content: post.content,
		},
	});

	const onSubmit = (data: EditPostFormData) => {
		const updateData: UpdatePostDto = {
			title: data.title.trim(),
			content: data.content.trim(),
		};

		updatePost(
			{ id: post.id, data: updateData },
			{
				onSuccess: () => {
					onClose();
				},
			}
		);
	};

	const titleValue = form.watch("title");
	const contentValue = form.watch("content");
	const isFormValid =
		form.formState.isValid && titleValue?.trim() && contentValue?.trim();

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-165">
				<DialogHeader>
					<DialogTitle className="font-bold text-[22px]">
						Edit Post
					</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<Controller
						name="title"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								data-invalid={fieldState.invalid}
								className="gap-2"
							>
								<FieldLabel
									htmlFor="edit-title"
									className="font-normal text-base"
								>
									Title
								</FieldLabel>
								<Input
									{...field}
									id="edit-title"
									placeholder="Post title"
									className={`border-input-border focus-visible:ring-1 ${
										fieldState.error
											? "border-red-500 focus-visible:ring-red-500"
											: ""
									}`}
								/>
								{fieldState.invalid && field.value && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name="content"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								data-invalid={fieldState.invalid}
								className="gap-2"
							>
								<FieldLabel
									htmlFor="edit-content"
									className="font-normal text-base"
								>
									Content
								</FieldLabel>
								<Textarea
									{...field}
									id="edit-content"
									placeholder="Post content"
									rows={6}
									className={`border-input-border focus-visible:ring-1 resize-none ${
										fieldState.error
											? "border-red-500 focus-visible:ring-red-500"
											: ""
									}`}
								/>
								{fieldState.invalid && field.value && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<DialogFooter className="gap-4">
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isPending}
							className="hover:bg-gray-200 border-black w-28 font-bold cursor-pointer"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={!isFormValid || isPending}
							className="bg-[#47B960] hover:bg-green-600 disabled:bg-gray-300 w-28 disabled:text-gray-500 cursor-pointer"
						>
							{isPending ? "Saving..." : "Save"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
