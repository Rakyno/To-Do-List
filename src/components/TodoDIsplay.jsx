import { FiEdit2 } from 'react-icons/fi';

const TodoDisplay = ({ todo, onToggle, onEdit, onDelete, isUpdating }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3 flex-grow">
      <div className="relative">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className={`h-5 w-5 rounded ${todo.isTemp ? 'text-purple-600' : 'text-blue-600'} ${
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
        <span className={`block ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
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
      <button onClick={onEdit} className="p-1 text-gray-500 hover:text-blue-500" title="Edit">
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
);

export default TodoDisplay;
