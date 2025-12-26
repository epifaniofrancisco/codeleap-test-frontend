import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { FilterOption, SortOption } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PostFiltersProps {
	sortBy: SortOption;
	filterBy: FilterOption;
	onSortChange: (value: SortOption) => void;
	onFilterChange: (value: FilterOption) => void;
	searchTerm: string;
	onSearchTermChange: (value: string) => void;
}

export const PostFilters = ({
	sortBy,
	filterBy,
	onSortChange,
	onFilterChange,
	searchTerm,
	onSearchTermChange,
}: PostFiltersProps) => {
	return (
		<div className="flex justify-between flex-wrap gap-3 p-6 rounded-xl border">
			<div>
				<Label className="text-xs font-medium mb-1">Sort by</Label>
				<Select value={sortBy} onValueChange={onSortChange}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="recent">Most Recent</SelectItem>
						<SelectItem value="oldest">Oldest First</SelectItem>
						<SelectItem value="most-liked">Most Liked</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div>
				<Label className="text-xs font-medium mb-1">Filter</Label>
				<Select value={filterBy} onValueChange={onFilterChange}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Posts</SelectItem>
						<SelectItem value="my-posts">My Posts</SelectItem>
						<SelectItem value="liked">Liked Posts</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="w-full sm:w-auto sm:flex-1">
				<Label htmlFor="search" className="text-xs font-medium mb-1">
					Search
				</Label>
				<Input
					id="search"
					type="text"
					value={searchTerm}
					onChange={(e) => onSearchTermChange(e.target.value)}
					placeholder="Search posts..."
					className="w-full focus-visible:ring-1"
				/>
			</div>
		</div>
	);
};
