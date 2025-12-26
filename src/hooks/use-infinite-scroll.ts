import { useEffect, useRef, useState } from "react";

export const useInfiniteScroll = (callback: () => void) => {
	const [isFetching, setIsFetching] = useState(false);
	const observerTarget = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isFetching) {
					setIsFetching(true);
					callback();
				}
			},
			{ threshold: 1.0 }
		);

		const currentTarget = observerTarget.current;
		if (currentTarget) {
			observer.observe(currentTarget);
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		};
	}, [callback, isFetching]);

	useEffect(() => {
		if (isFetching) {
			const timer = setTimeout(() => setIsFetching(false), 1000);
			return () => clearTimeout(timer);
		}
	}, [isFetching]);

	return { observerTarget, isFetching };
};
