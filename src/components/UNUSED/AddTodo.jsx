import { useState } from 'react';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const AddTodo = ({ setTodos, setLoading, setError, onUpdate, onAdd }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const generateTempId = () => 'temp-' + Math.random().toString(36).substr(2, 9);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tempId = generateTempId();
    try {
      setLoading(true);

      // 1. Create temporary todo (optimistic update)
      const tempTodo = {
        id: tempId,
        title,
        completed: false,
        dueDate: dueDate || new Date().toISOString().split('T')[0],
        isTemp: true
      };
      onAdd(tempTodo);
      
      setTodos(prev => [tempTodo, ...prev]);
      // 2. Make API call
      const response = await axios.post(API_URL, {
        title,
        completed: false,
        userId: 1,
        dueDate: tempTodo.dueDate
      });


      

      // 3. Replace temp todo with API response
      setTodos(prev => prev.map(todo => {
        if (todo.id === tempId) {
          const newTodo = { ...response.data, isTemp: false };
          // Handle duplicate IDs from mock API
          const isDuplicate = prev.some(t => t.id === response.data.id && t.id !== tempId);
          return {
            ...newTodo,
            id: isDuplicate ? generateTempId() : response.data.id
          };
        }
        return todo;
      }));

      onUpdate(tempId, {
        ...response.data,
        isTemp: false,
        // Handle mock API's static ID response
        id: response.data.id === 201 ? Date.now() : response.data.id
      });

      // Reset form
      setTitle('');
      setDueDate('');
    } catch{
      // Remove temp todo on error
      setTodos(prev => prev.filter(todo => todo.id !== tempId));
      setError("Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
        >
          <FiPlus /> Add
        </button>
      </div>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        className="w-full p-2 border rounded"
      />
    </form>
  );
};

export default AddTodo;