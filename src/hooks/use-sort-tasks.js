import { useState, useCallback } from 'react';
import { useTodoContext } from '../TodoContext';

export const useSortTasks = () => {
	const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);

	const { todos } = useTodoContext();

	const toggleSort = useCallback(() => {
		setIsSortedAlphabetically((prev) => !prev);
	}, []);

	const sortedTodos = isSortedAlphabetically
		? [...todos].sort((a, b) => a.title.localeCompare(b.title))
		: todos;

	return { isSortedAlphabetically, toggleSort, sortedTodos };
};
