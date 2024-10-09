import { useState, useEffect } from 'react';

export const useGetTodoList = (setTodos, setFilteredTodos) => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		// делаем http запрос (fetch)
		fetch('http://localhost:3005/tasks')
			.then((loadedData) => loadedData.json())
			.then((loadedTasks) => {
				setTodos(loadedTasks);
				setFilteredTodos(loadedTasks); // И изначально заполняем список отфильтрованных задач
			})
			.finally(() => setIsLoading(false));
	}, [setTodos, setFilteredTodos]); // массив зависимостей

	return {
		isLoading,
	};
};
