import { useState } from 'react';

export const useSortTasks = () => {
	const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
	const toggleSort = () => {
		setIsSortedAlphabetically((prev) => !prev);
	};
	return {
		isSortedAlphabetically,
		toggleSort,
	};
};
