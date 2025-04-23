import axios from 'axios';
import { useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const UpdateTodo = ({ 
  todo, 
  todos, 
  setTodos, 
  setError, 
  setLoading,
  currentlyUpdatingId,
  setCurrentlyUpdatingId 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || '');

  const handleUpdate = async (updatedData) => {
    const originalTodo = todos.find(t => t.id === todo.id);
    if (!originalTodo) return;

    try {
      setCurrentlyUpdatingId(todo.id);
      setLoading(true);

      // Optimistic update
      setTodos(prevTodos =>
        prevTodos.map(t =>
          t.id === todo.id ? { ...t, ...updatedData } : t
        )
      );

      // Skip API for temp todos
      if (originalTodo.isTemp) {
        setIsEditing(false);
        return;
      }

      // API call
      await axios.patch(`${API_URL}/${todo.id}`, updatedData);
      setIsEditing(false);
    } catch (error) {
      // Revert on error
      setTodos(prevTodos =>
        prevTodos.map(t =>
          t.id === todo.id ? originalTodo : t
        )
      );
      setError(error.message || "Failed to update todo");
    } finally {
      setCurrentlyUpdatingId(null);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate({
      title: editedTitle,
      dueDate: editedDueDate || null
    });
  };

  if (!isEditing) {
    return (
      <button 
        onClick={() => setIsEditing(true)}
        className="text-gray-500 hover:text-blue-500 p-1"
        disabled={!!currentlyUpdatingId}
      >
        Edit
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2 bg-gray-50 rounded">
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="date"
        value={editedDueDate}
        onChange={(e) => setEditedDueDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        className="p-2 border rounded"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setIsEditing(false);
            setEditedTitle(todo.title);
            setEditedDueDate(todo.dueDate || '');
          }}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!editedTitle.trim() || currentlyUpdatingId === todo.id}
        >
          {currentlyUpdatingId === todo.id ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default UpdateTodo;