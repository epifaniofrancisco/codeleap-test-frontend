import { useDeletePost } from "@/hooks/use-posts";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
	postId: number;
	onClose: () => void;
}

export const DeletePostModal = ({ postId, onClose }: DeleteModalProps) => {
	const { mutate: deletePost, isPending } = useDeletePost();

	const handleDelete = () => {
		deletePost(postId, {
			onSuccess: () => {
				onClose();
			},
		});
	};

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-165">
				<DialogHeader>
					<DialogTitle className="font-bold text-[22px]">
						Are you sure you want to delete this item?
					</DialogTitle>
				</DialogHeader>

				<DialogFooter className="gap-2 mt-4">
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
						type="button"
						onClick={handleDelete}
						disabled={isPending}
						className="bg-[#FF5151] hover:bg-[#FF5151]/90 text-white w-28 cursor-pointer"
					>
						{isPending ? "Deleting..." : "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
