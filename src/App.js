import { TodoProvider } from './TodoContext';
import { TodoListComponent } from './TodoListComponent';

function App() {
	return (
		<TodoProvider>
			<TodoListComponent />
		</TodoProvider>
	);
}

export default App;
