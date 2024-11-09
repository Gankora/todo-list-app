export const filterInitialState = { filteredTodos: [], searchQuery: '' };

export const filterReducer = (state = filterInitialState, action) => {
	switch (action.type) {
		case 'SET_FILTERED_TODOS':
			return { ...state, filteredTodos: action.payload };
		case 'SET_SEARCH_QUERY':
			return { ...state, searchQuery: action.payload };
		default:
			return state;
	}
};
