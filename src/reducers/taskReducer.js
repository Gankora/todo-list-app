const initialState = {
	newTaskTitle: '',
	editingTask: null,
};

export const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NEW_TASK_TITLE':
			return {
				...state,
				newTaskTitle: action.payload,
			};
		case 'SET_EDITING_TASK':
			return {
				...state,
				editingTask: action.payload,
			};

		default:
			return state;
	}
};
