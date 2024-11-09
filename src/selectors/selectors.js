import { createSelector } from 'reselect'; // Для избежания ненужных перерисовок компонента (выдаёт предупреждение)

const selectTodos = (state) => state.todos;
const selectFilteredTodos = (state) => state.filter.filteredTodos;
const selectSearchQuery = (state) => state.filter.searchQuery;
const selectNewTaskTitle = (state) => state.taskState.newTaskTitle;
const selectIsSortedAlphabetically = (state) => state.sorting.isSortedAlphabetically;
const selectIsLoading = (state) => state.loading;
const selectEditingTask = (state) => state.taskState.editingTask;

export const selectAllTodoListData = createSelector(
	[
		selectTodos,
		selectFilteredTodos,
		selectSearchQuery,
		selectNewTaskTitle,
		selectIsSortedAlphabetically,
		selectIsLoading,
		selectEditingTask,
	],
	(
		todos,
		filteredTodos,
		searchQuery,
		newTaskTitle,
		isSortedAlphabetically,
		isLoading,
		editingTask,
	) => ({
		todos,
		filteredTodos,
		searchQuery,
		newTaskTitle,
		isSortedAlphabetically,
		isLoading,
		editingTask,
	}),
);
