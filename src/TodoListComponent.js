import { useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useTodoContext } from './TodoContext';
import {
	useAddTask,
	useDeleteTask,
	useGetTodoList,
	useSortTasks,
	useUpdateTask,
} from './hooks';
import styles from './app.module.css';

export const TodoListComponent = () => {
	const {
		filteredTodos,
		setFilteredTodos,
		todos,
		searchQuery,
		setSearchQuery,
		newTaskTitle,
		setNewTaskTitle,
	} = useTodoContext();

	// подключение хуков в главный компонент
	const { addTask } = useAddTask();
	const { deleteTask } = useDeleteTask();
	const { isLoading } = useGetTodoList();
	const { editingTask, startEditing, updateTask } = useUpdateTask();
	const { isSortedAlphabetically, toggleSort, sortedTodos } = useSortTasks();

	// условие для поиска и сортировки
	const todosArray = isSortedAlphabetically ? sortedTodos : filteredTodos;

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
						disabled={isSortedAlphabetically}
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
};
