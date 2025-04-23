import { useState } from 'react';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import DatePicker from 'react-datepicker';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate, currentlyUpdatingId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);
  const isUpdating = currentlyUpdatingId === todo.id;

  const handleSave = () => {
    onUpdate(todo.id, {
      title: editedTitle,
      dueDate: editedDueDate
    });
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col p-3 bg-white rounded-lg shadow mb-2">
      {isEditing ? (
        <div className="flex flex-col space-y-2 absolute z-10 mt-2 p-2 bg-white border rounded shadow-lg">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
            disabled={isUpdating}
          />
          <DatePicker
          selected={editedDueDate}
          onChange={(date) => {
            setEditedDueDate(date);
            
          }}
          inline
          minDate={new Date()}
      

          />
          <div className="flex space-x-2 justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
              disabled={isUpdating}
            >
              <FiX />
            </button>
            <button
              onClick={handleSave}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <span className="animate-spin mr-2">↻</span>
              ) : (
                <FiSave className="mr-1" />
              )}
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-grow">
            <div className="relative">
              
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className={`h-5 w-5 rounded ${
                  todo.isTemp ? 'text-purple-600' : 'text-blue-600'
                  } focus:ring-${todo.isTemp ? 'purple' : 'blue'}-500 ${
                    isUpdating ? 'opacity-50' : ''
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
            <div className="flex-grow">
              <span className={`block ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}>
                {todo.title}
              </span>
              {todo.dueDate && (
                <span className="text-xs text-gray-500">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
                
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-500 hover:text-blue-500"
              title="Edit"
            >
              <FiEdit2 />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 text-gray-500 hover:text-red-500"
              title="Delete"
              disabled={isUpdating}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem