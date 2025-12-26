import React from "react";

interface MentionTextProps {
	text: string;
	validUsernames: string[];
}

export const MentionText: React.FC<MentionTextProps> = ({
	text,
	validUsernames,
}) => {
	const parts = text.split(/(@\w+)/g);

	return (
		<>
			{parts.map((part, index) => {
				if (part.match(/^@\w+$/)) {
					const username = part.slice(1);
					if (validUsernames.includes(username)) {
						return (
							<span
								key={`mention-${index}`}
								className="text-blue-600 font-semibold hover:underline cursor-pointer"
							>
								{part}
							</span>
						);
					}
				}
				return <span key={`text-${index}`}>{part}</span>;
			})}
		</>
	);
};
