import { useState } from 'react';

export const useUpdateTask = (newTaskTitle, setNewTaskTitle, setTodos) => {
	const [editingTask, setEditingTask] = useState(null); // изменение задачи

	const startEditing = (task) => {
		// функция вывода задачи в инпут для обновления задачи
		setEditingTask(task); // сам объект задачи (id, title)

		setNewTaskTitle(task.title);
	};

	const updateTask = () => {
		if (!newTaskTitle || !editingTask) return;

		const updateTask = { title: newTaskTitle };

		fetch(`http://localhost:3005/tasks/${editingTask.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateTask),
		})
			.then((response) => response.json())
			.then((updatedTask) => {
				setTodos((prevTodos) =>
					prevTodos.map(
						(todo) => (todo.id === updatedTask.id ? updatedTask : todo),
						// id обновлённой задачи сравнивается с id всех задач из массива, при совпадении id, старая задача сменяется на новую (изменённую)
					),
				);
				setEditingTask(null); // сброс редактируемой задачи
				setNewTaskTitle('');
			});
	};
	return {
		editingTask,
		startEditing,
		updateTask,
	};
};
