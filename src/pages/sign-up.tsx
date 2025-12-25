import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserStore } from "@/store/user-store";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const signupSchema = z.object({
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must be at most 20 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
	const setUsername = useUserStore((state) => state.setUsername);

	const form = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		mode: "onChange",
		defaultValues: {
			username: "",
		},
	});

	function onSubmit(data: SignupFormData) {
		setUsername(data.username.trim());
	}

	const usernameValue = form.watch("username");
	const isFormValid = form.formState.isValid && usernameValue?.trim();

	return (
		<main className="flex justify-center items-center bg-background px-4 min-h-screen">
			<Card className="shadow-xl border-[#CCCCCC] w-full max-w-125">
				<CardHeader className="gap-0">
					<CardTitle className="font-bold text-[22px]">
						Welcome to CodeLeap network!
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Controller
							name="username"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field
									data-invalid={fieldState.invalid}
									className="gap-2"
								>
									<FieldLabel
										htmlFor="username"
										className="m-0 font-normal text-base"
									>
										Please enter your username
									</FieldLabel>
									<Input
										{...field}
										id="username"
										placeholder="John doe"
										autoFocus
										autoComplete="off"
										className={
											fieldState.error && field.value
												? "border-red-500 focus-visible:ring-[1px] focus-visible:ring-red-500"
												: "border-input-border focus-visible:ring-1"
										}
									/>
									{fieldState.invalid && field.value && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<div className="flex justify-end mt-4">
							<Button
								type="submit"
								disabled={!isFormValid}
								className="bg-primary hover:bg-primary/90 disabled:bg-gray-300 px-8 h-8 font-bold disabled:text-gray-500 text-base cursor-pointer disabled:cursor-not-allowed"
							>
								ENTER
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</main>
	);
}
