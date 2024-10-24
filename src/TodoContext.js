import { createContext, useContext, useState } from 'react';

const TodoContext = createContext(); // создание контекста

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	return (
		<TodoContext.Provider
			value={{
				todos,
				setTodos,
				filteredTodos,
				setFilteredTodos,
				newTaskTitle,
				setNewTaskTitle,
				searchQuery,
				setSearchQuery,
				isLoading,
				setIsLoading,
				isSortedAlphabetically,
				setIsSortedAlphabetically,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodoContext = () => {
	return useContext(TodoContext);
};
