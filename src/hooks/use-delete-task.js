export const useDeleteTask = (setTodos) => {
	const deleteTask = (taskId) => {
		fetch(`http://localhost:3005/tasks/${taskId}`, {
			method: 'DELETE',
		}).then(() => {
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
			// если выбранный id (текущий) равен id задачи из прошлого состояния (todo.id), значит в новый массив его не берём.
		});
	};

	return {
		deleteTask,
	};
};
