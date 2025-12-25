import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserStore } from "@/store/user-store";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";

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
		<main className="flex items-center justify-center min-h-screen bg-[#DDDDDD] px-4">
			<Card className="w-full max-w-125 border-[#CCCCCC] shadow-xl">
				<CardHeader className="gap-0">
					<CardTitle className="text-[22px] font-bold">
						Welcome to CodeLeap network!
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Controller
							name="username"
							control={form.control}
							render={({ field, fieldState }) => (
								<div className="space-y-2">
									<Label
										htmlFor="username"
										className="text-base font-normal"
									>
										Please enter your username
									</Label>
									<Input
										{...field}
										id="username"
										placeholder="John doe"
										autoFocus
										autoComplete="off"
										className={
											fieldState.error && field.value
												? "border-red-500 focus-visible:ring-[1px] focus-visible:ring-red-500"
												: "border-[#777777] focus-visible:ring-1"
										}
									/>
									{fieldState.invalid && field.value && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</div>
							)}
						/>
					</form>
				</CardContent>
				<CardFooter className="flex justify-end">
					<Button
						type="submit"
						disabled={!isFormValid}
						className="bg-[#7695EC] hover:bg-[#7695EC]/90 cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed font-bold h-8 px-8 text-base"
					>
						ENTER
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
