import { useState } from 'react';
import { useTodoContext } from '../TodoContext';

export const useUpdateTask = () => {
	const [editingTask, setEditingTask] = useState(null); // изменение задачи

	const { newTaskTitle, setNewTaskTitle, setTodos } = useTodoContext();

	const startEditing = (task) => {
		// функция вывода задачи в инпут для обновления задачи
		setEditingTask(task); // сам объект задачи (id, title)

		setNewTaskTitle(task.title);
	};

	const updateTask = () => {
		if (!newTaskTitle || !editingTask) return;

		const updatedTask = { ...editingTask, title: newTaskTitle };

		setTodos((prevTodos) =>
			prevTodos.map(
				(todo) => (todo.id === updatedTask.id ? updatedTask : todo),
				// id обновлённой задачи сравнивается с id всех задач из массива, при совпадении id, старая задача сменяется на новую (изменённую)
			),
		);
		setEditingTask(null); // сброс редактируемой задачи
		setNewTaskTitle('');
	};
	return {
		editingTask,
		startEditing,
		updateTask,
	};
};
