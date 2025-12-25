import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserStore } from "@/store/user-store";
import { useCreatePost } from "@/hooks/use-posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { CreatePostDto } from "@/types/index";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";

const createPostSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title must be at most 100 characters"),
	content: z
		.string()
		.min(1, "Content is required")
		.max(5000, "Content must be at most 5000 characters"),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

export const CreatePostForm = () => {
	const username = useUserStore((state) => state.username);
	const { mutate: createPost, isPending } = useCreatePost();

	const form = useForm<CreatePostFormData>({
		resolver: zodResolver(createPostSchema),
		mode: "onChange",
		defaultValues: {
			title: "",
			content: "",
		},
	});

	const onSubmit = (data: CreatePostFormData) => {
		if (!username) return;

		const postData: CreatePostDto = {
			username,
			title: data.title.trim(),
			content: data.content.trim(),
		};

		createPost(postData, {
			onSuccess: () => {
				form.reset();
			},
		});
	};

	const titleValue = form.watch("title");
	const contentValue = form.watch("content");
	const isFormValid =
		form.formState.isValid && titleValue?.trim() && contentValue?.trim();

	return (
		<Card className="border-card-border">
			<CardHeader className="gap-0">
				<CardTitle className="font-bold text-[22px]">
					What's on your mind?
				</CardTitle>
			</CardHeader>
			<CardContent className="">
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
									htmlFor="title"
									className="font-normal text-base"
								>
									Title
								</FieldLabel>
								<Input
									{...field}
									id="title"
									placeholder="Hello world"
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
									htmlFor="content"
									className="font-normal text-base"
								>
									Content
								</FieldLabel>
								<Textarea
									{...field}
									id="content"
									placeholder="Content here"
									rows={4}
									className={`resize-none focus-visible:ring-1 ${
										fieldState.error
											? "border-red-500 focus-visible:ring-red-500"
											: "border-input-border "
									}`}
								/>
								{fieldState.invalid && field.value && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<div className="flex justify-end">
						<Button
							type="submit"
							disabled={!isFormValid || isPending}
							className="bg-primary hover:bg-primary/90 disabled:bg-gray-300 px-8 font-bold disabled:text-gray-500 disabled:cursor-not-allowed"
						>
							{isPending ? "Creating..." : "Create"}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};
