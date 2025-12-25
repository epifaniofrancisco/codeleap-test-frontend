import { LogOut } from "lucide-react";
import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { CreatePostForm } from "@/components/create-post-form";
import { PostList } from "./post-list";

export default function PostsPage() {
	const { clearUsername } = useUserStore();

	const onLogout = () => {
		clearUsername();
		globalThis.location.href = "/";
    };
    
    useEffect(() => {
		document.title = "Posts - CodeLeap Network";
	}, []);

	return (
		<main className="bg-background min-h-screen">
			<section className="flex flex-col gap-6 bg-white mx-auto px-4 sm:px-6 pb-6 max-w-200">
				<header className="flex justify-between items-center bg-primary px-9 h-20">
					<h1 className="font-bold text-white text-xl">
						CodeLeap Network
					</h1>
					<Button
						onClick={onLogout}
						className="bg-white hover:bg-red-300 rounded-full w-8 h-8 text-black cursor-pointer"
					>
						<LogOut />
					</Button>
                </header>
                
                <CreatePostForm />

                <PostList />
			</section>
		</main>
	);
}
