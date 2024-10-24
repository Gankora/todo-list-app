import { useTodoContext } from '../TodoContext';

export const useDeleteTask = () => {
	const { setTodos } = useTodoContext();

	const deleteTask = (taskId) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
		// если выбранный id (текущий) равен id задачи из прошлого состояния (todo.id), значит в новый массив его не берём.
	};

	return {
		deleteTask,
	};
};
