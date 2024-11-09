export const sortingInitialState = { isSortedAlphabetically: false };

export const sortingReducer = (state = sortingInitialState, action) => {
	switch (action.type) {
		case 'TOGGLE_SORT':
			return { ...state, isSortedAlphabetically: !state.isSortedAlphabetically };
		default:
			return state;
	}
};
