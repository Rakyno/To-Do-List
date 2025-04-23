import axios from 'axios';
import { useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const ToggleTodo = ({ 
  todo, 
  setTodos,  
  setError, 
  setCurrentlyUpdatingId 
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    const id = todo.id;
    let newCompletedState;
    
    try {
      setIsUpdating(true);
      setCurrentlyUpdatingId(id);
      
      newCompletedState = !todo.completed;
      
      // Optimistic update
      setTodos(prevTodos => 
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed: newCompletedState } : todo
        )
      );
      
      // Skip API call for temporary todos
      if (todo.isTemp) return;
      
      // API call for persistent todos Chat-GPT
      await axios.patch(`${API_URL}/${id}`, {
        completed: newCompletedState
      });
      
    } catch (error) {
      // Revert on error
      setTodos(prevTodos => 
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed: todo.completed } : todo
        )
      );
      setError(error.message || 'Failed to update todo status');
    } finally {
      setIsUpdating(false);
      setCurrentlyUpdatingId(null);
    }
  };

  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className={`h-5 w-5 rounded ${
          todo.isTemp ? 'text-purple-600' : 'text-blue-600'
        } focus:ring-${todo.isTemp ? 'purple' : 'blue'}-500 ${
          isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        disabled={isUpdating}
      />
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`animate-spin rounded-full h-3 w-3 border-b-2 ${
            todo.isTemp ? 'border-purple-500' : 'border-blue-500'
          }`}></div>
        </div>
      )}
    </div>
  );
};

export default ToggleTodo;