import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentlyUpdatingId, setCurrentlyUpdatingId] = useState(null);


  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}?_limit=5`);
        setTodos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add this function to generate temporary IDs
// Replace the temp ID generation with this
const generateTempId = () => {
  return 'temp-' + Math.random().toString(36).substr(2, 9);
};

// Update your addTodo function
const addTodo = async (title, dueDate) => {
  const tempId = generateTempId(); // ✅ Correctly declared at the top, in scope
  try {
    setLoading(true);

    const tempTodo = {
      id: tempId,
      title,
      completed: false,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      isTemp: true
    };
    console.log('Todos:', todos.map(t => t.id));


    setTodos(prev => [tempTodo, ...prev]);

    const response = await axios.post(API_URL, {
      title,
      completed: false,
      userId: 1,
      dueDate: tempTodo.dueDate
    });

    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === tempId) {
          const newTodo = { ...response.data, isTemp: false };
          // Prevent duplicate ID
          const isIdDuplicate = prev.some(t => t.id === response.data.id && t.id !== tempId);
          return {
            ...newTodo,
            id: isIdDuplicate ? generateTempId() : response.data.id
          };
        }
        return todo;
      })
    );
    

    setTodos(prev => prev.map(todo =>
      todo.id === tempId ? { ...response.data, isTemp: false } : todo
    ));
  } catch {
    setTodos(prev => prev.filter(todo => todo.id !== tempId));
    setError("Failed to add todo");
  } finally {
    setLoading(false);
  }
};

const toggleTodo = async (id) => {
  let newCompletedState
  try {
    setCurrentlyUpdatingId(id); // Track which todo is updating
    setLoading(true);
    
    const todoToToggle = todos.find(todo => todo.id === id);
    if (!todoToToggle) return;
    
    const newCompletedState = !todoToToggle.completed;
    
    // Optimistic update
    setTodos(prevTodos => 
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: newCompletedState } : todo
      )
    );
    
    // Skip API call for temporary todos
    if (todoToToggle.isTemp) {
      setLoading(false);
      setCurrentlyUpdatingId(null);
      return;
    }
    
    // API call for real todos
    await axios.patch(`${API_URL}/${id}`, {
      completed: newCompletedState
    });
    
  } catch{
    // Revert on error
    setTodos(prevTodos => 
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !newCompletedState } : todo
      )
    );
    setError('Failed to update todo status');
  } finally {
    setCurrentlyUpdatingId(null);
    setLoading(false);
  }
};

  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center border-b-2 pb-3 border-sky-700">Todo App</h1>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} loading={loading} currentlyUpdatingId={currentlyUpdatingId}/>
      <AddTodoForm onAdd={addTodo} />
    </div>
  );
}

export default App;
