import { useTodoContext } from '../TodoContext';

export const useAddTask = () => {
	const { newTaskTitle, setNewTaskTitle, setTodos } = useTodoContext();

	const addTask = () => {
		if (!newTaskTitle) return;

		const newTask = { title: newTaskTitle };

		setTodos((prevTodos) => [...prevTodos, newTask]);
		setNewTaskTitle('');
	};
	return {
		addTask,
	};
};
