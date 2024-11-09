import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTodoListData } from './selectors/selectors';
import {
	initializeTasks,
	setSearchQuery,
	addTask,
	deleteTask,
	toggleSort,
	setFilteredTodos,
	setNewTaskTitle,
	setEditingTask,
	updateTaskAction,
} from './actions';
import debounce from 'lodash.debounce';

import styles from './app.module.css';

export const TodoListComponent = () => {
	const dispatch = useDispatch();

	const {
		todos,
		filteredTodos,
		searchQuery,
		newTaskTitle,
		isSortedAlphabetically,
		isLoading,
		editingTask,
	} = useSelector(selectAllTodoListData);

	const startEditing = (task) => {
		dispatch(setEditingTask(task)); // Обновляем редактируемую задачу
		dispatch(setNewTaskTitle(task.title)); // Устанавливаем название задачи для редактирования
	};

	const updateTask = () => {
		if (!newTaskTitle || !editingTask) return;

		const updatedTask = { ...editingTask, title: newTaskTitle };

		dispatch(updateTaskAction(updatedTask)); // Введите нужное действие для обновления задачи
		dispatch(setEditingTask(null)); // Сброс редактируемой задачи
		dispatch(setNewTaskTitle('')); // Сброс названия новой задачи
	};

	// условие для поиска и сортировки
	const todosArray = todos
		.filter(
			(todo) =>
				!searchQuery ||
				todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
		)
		.sort((a, b) => (isSortedAlphabetically ? a.title.localeCompare(b.title) : 0));

	// продвинутый поиск с помощью debounce()
	useEffect(() => {
		dispatch(initializeTasks());
	}, [dispatch]);

	const searchTasks = (query) => {
		const lowerCaseQuery = query.toLowerCase();
		const filtered = todos.filter((todo) =>
			todo.title.toLowerCase().includes(lowerCaseQuery),
		);

		// обновление filteredTodos только при изменении результатов
		if (JSON.stringify(filtered) !== JSON.stringify(filteredTodos)) {
			dispatch(setFilteredTodos(filtered));
		}
	};

	const debouncedSearch = debounce(searchTasks, 300);

	useEffect(() => {
		debouncedSearch(searchQuery);
	}, [searchQuery, debouncedSearch]);

	const handleAddTask = () => {
		if (!newTaskTitle) return;
		const newTask = { id: Date.now(), title: newTaskTitle };
		dispatch(addTask(newTask)); // Добавление задачи
		dispatch(setNewTaskTitle('')); // Сброс значения 'newTaskTitle', после добавления задачи
	};

	return (
		<div className={styles.app}>
			<div className={styles.todosForm}>
				<div className={styles.tasksOperation}>
					<input
						className={styles.findTask}
						type="text"
						value={searchQuery}
						onChange={({ target }) => dispatch(setSearchQuery(target.value))}
						placeholder="Найти задачу"
					/>
					<button
						className={styles.sortButton}
						style={
							isSortedAlphabetically ? { backgroundColor: '#4caf50' } : null
						}
						onClick={() => dispatch(toggleSort())}
					>
						sort abc
					</button>
				</div>

				<h1>Список задач</h1>

				<input
					className={styles.addTask}
					type="text"
					value={newTaskTitle}
					onChange={({ target }) => dispatch(setNewTaskTitle(target.value))}
					placeholder="Введите название задачи"
				/>
				<button
					className={styles.taskButton}
					onClick={editingTask ? () => updateTask() : () => handleAddTask()}
				>
					{editingTask ? 'Сохранить изменения' : 'Добавить задачу'}
				</button>

				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					todosArray
						.sort((a, b) =>
							isSortedAlphabetically
								? a.title.localeCompare(b.title)
								: null,
						)
						.map(({ id, title }) => (
							<div className={styles.taskBlock} key={id}>
								<span
									className={styles.taskText}
									onClick={() => startEditing({ id, title })}
									style={{ cursor: 'pointer' }}
								>
									{title}
								</span>
								<button
									className={styles.deleteButton}
									onClick={() => dispatch(deleteTask(id))}
								>
									Удалить
								</button>
							</div>
						))
				)}
			</div>
		</div>
	);
};
