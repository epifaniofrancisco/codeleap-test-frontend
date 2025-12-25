import { formatDistanceToNow, format, differenceInDays } from "date-fns";

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const daysDiff = differenceInDays(new Date(), date);

	if (daysDiff > 30) {
		return format(date, "MMMM d, yyyy");
	}

	return formatDistanceToNow(date, { addSuffix: true });
};
