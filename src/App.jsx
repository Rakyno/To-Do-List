import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import LoadingSpinner from "./components/LoadingSpinner";
import useTodos from "./components/Hooks/useTodos";

function App() {
  
  const {
    todos,
    loading,
    error,
    currentlyUpdatingId,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo
  } = useTodos();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="font-cursive text-4xl  mb-4 text-center border-b-2  pb-3 border-sky-700">Todo App</h1>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} loading={loading} onUpdate={updateTodo} currentlyUpdatingId={currentlyUpdatingId}/>
      <AddTodoForm onAdd={addTodo} />
    </div>
  );
}

export default App;
