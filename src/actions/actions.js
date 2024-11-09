export const setTodos = (todos) => ({ type: 'SET_TODOS', payload: todos });
export const addTask = (task) => ({ type: 'ADD_TASK', payload: task });
export const updateTaskAction = (task) => ({ type: 'UPDATE_TASK', payload: task });
export const deleteTask = (taskId) => ({ type: 'DELETE_TASK', payload: taskId });
export const setNewTaskTitle = (title) => ({
	type: 'SET_NEW_TASK_TITLE',
	payload: title,
});
export const setFilteredTodos = (todos) => ({
	type: 'SET_FILTERED_TODOS',
	payload: todos,
});

export const setEditingTask = (task) => ({
	type: 'SET_EDITING_TASK',
	payload: task,
});

export const setSearchQuery = (query) => ({ type: 'SET_SEARCH_QUERY', payload: query });
export const toggleSort = () => ({ type: 'TOGGLE_SORT' });
export const setLoading = (isLoading) => ({ type: 'SET_LOADING', payload: isLoading });

export const initializeTasks = () => (dispatch) => {
	const initialTasks = [
		{ id: 1, title: 'Сделать уроки' },
		{ id: 2, title: 'Убраться в квартире' },
		{ id: 3, title: 'Заказать суши' },
	];

	dispatch(setLoading(true));
	setTimeout(() => {
		dispatch(setTodos(initialTasks));
		dispatch(setFilteredTodos(initialTasks));
		dispatch(setLoading(false));
	}, 1000);
};
