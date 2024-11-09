export const todosReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_TODOS':
			return action.payload;
		case 'ADD_TASK':
			return [...state, action.payload];
		case 'UPDATE_TASK':
			return state.map((todo) =>
				todo.id === action.payload.id ? action.payload : todo,
			);
		case 'DELETE_TASK':
			return state.filter((todo) => todo.id !== action.payload);
		default:
			return state;
	}
};
