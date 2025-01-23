import TaskList from "./components/task/TaskList";
import { TaskContextProvider } from "./contexts/TaskProvider";

function App() {
  return (
    <main>
      <h1>Task Manager</h1>
      <TaskContextProvider>
        <TaskList />
      </TaskContextProvider>
    </main>
  );
}

export default App;
