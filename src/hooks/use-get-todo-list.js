import { useState, useEffect } from 'react';
import { useTodoContext } from '../TodoContext';

export const useGetTodoList = () => {
	const [isLoading, setIsLoading] = useState(false);

	const { setTodos, setFilteredTodos } = useTodoContext();

	useEffect(() => {
		const initialTasks = [
			{ id: 1, title: 'Сделать уроки' },
			{ id: 2, title: 'Убраться в квартире' },
			{ id: 3, title: 'Заказать суши' },
		];

		setTodos(initialTasks);
		setFilteredTodos(initialTasks);
	}, [setTodos, setFilteredTodos]);

	return {
		isLoading: false,
	};
};
