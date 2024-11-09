import {
	todosReducer,
	filterReducer,
	sortingReducer,
	loadingReducer,
	taskReducer,
} from './reducers';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
	todos: todosReducer,
	filter: filterReducer,
	sorting: sortingReducer,
	loading: loadingReducer,
	taskState: taskReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	/* preloadedState, */ composeEnhancers(applyMiddleware(thunk)),
);
