import React from 'react';
import ReactDOM from 'react-dom/client';
import { TodoProvider } from './TodoContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<TodoProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
		,
	</TodoProvider>,
);
