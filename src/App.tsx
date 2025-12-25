import { useUserStore } from "@/store/user-store";
import SignupPage from "@/pages/sign-up";
import PostsPage from "./pages/posts";

function App() {
	const username = useUserStore((state) => state.username);

	if (!username) {
		return <SignupPage />;
	}

	return <PostsPage />;
}

export default App;
