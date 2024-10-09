import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import styles from './app.module.css';
import {
	useAddTask,
	useDeleteTask,
	useGetTodoList,
	useSortTasks,
	useUpdateTask,
} from './hooks';

function App() {
	const [newTaskTitle, setNewTaskTitle] = useState(''); // создание задачи (исп. в onChange)
	const [searchQuery, setSearchQuery] = useState(''); // поиск задачи
	const [todos, setTodos] = useState([]); // массив задач
	const [filteredTodos, setFilteredTodos] = useState([]); // массив по результатам поиска

	// подключение хуков в главный компонент
	const { addTask } = useAddTask(newTaskTitle, setNewTaskTitle, setTodos);
	const { deleteTask } = useDeleteTask(setTodos);
	const { isLoading } = useGetTodoList(setTodos, setFilteredTodos);
	const { editingTask, startEditing, updateTask } = useUpdateTask(
		newTaskTitle,
		setNewTaskTitle,
		setTodos,
	);
	const { isSortedAlphabetically, toggleSort } = useSortTasks();

	// продвинутый поиск с помощью debounce()
	const searchTasks = useCallback(
		(query) => {
			const lowerCaseQuery = query.toLowerCase();
			const filtered = todos.filter((todo) =>
				todo.title.toLowerCase().includes(lowerCaseQuery),
			);
			setFilteredTodos(filtered);
		},
		[todos],
	);

	useEffect(() => {
		const debouncedSearch = debounce(searchTasks, 300);
		debouncedSearch(searchQuery);

		return () => {
			debouncedSearch.cancel();
		};
	}, [searchQuery, searchTasks]);

	return (
		<div className={styles.app}>
			<div className={styles.todosForm}>
				<div className={styles.tasksOperation}>
					<input
						className={styles.findTask}
						type="text"
						value={searchQuery}
						onChange={({ target }) => setSearchQuery(target.value)}
						placeholder="Найти задачу"
					/>
					<button
						className={styles.sortButton}
						style={
							isSortedAlphabetically ? { backgroundColor: '#4caf50' } : null
						}
						onClick={toggleSort}
					>
						sort abc
					</button>
				</div>

				<h1>Список задач</h1>

				<input
					className={styles.addTask}
					type="text"
					value={newTaskTitle}
					onChange={({ target }) => setNewTaskTitle(target.value)}
					placeholder="Введите название задачи"
				/>
				<button
					className={styles.taskButton}
					onClick={editingTask ? updateTask : addTask}
				>
					{editingTask ? 'Сохранить изменения' : 'Добавить задачу'}
				</button>

				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					filteredTodos
						.sort((a, b) =>
							isSortedAlphabetically
								? a.title.localeCompare(b.title)
								: null,
						)
						.map(({ id, title }) => (
							<div className={styles.taskBlock} key={id}>
								<span
									onClick={() => startEditing({ id, title })}
									style={{ cursor: 'pointer' }}
								>
									{title}
								</span>
								<button
									className={styles.deleteButton}
									onClick={() => deleteTask(id)}
								>
									Удалить
								</button>
							</div>
						))
				)}
			</div>
		</div>
	);
}

export default App;

// json-server --watch src/db.json --port 3005
