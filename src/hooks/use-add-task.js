export const useAddTask = (newTaskTitle, setNewTaskTitle, setTodos) => {
	const addTask = () => {
		if (!newTaskTitle) return;

		const newTask = { title: newTaskTitle };

		fetch('http://localhost:3005/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTask),
		})
			.then((response) => response.json())
			.then((createdTask) => {
				setTodos((prevTodos) => [...prevTodos, createdTask]);
				setNewTaskTitle('');
			});
	};
	return {
		addTask,
	};
};
