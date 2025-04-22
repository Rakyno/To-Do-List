const TodoItem = ({ todo, onToggle, onDelete,loading }) => {
  return (
    <li className="flex items-center justify-between p-3 bg-white rounded-lg shadow hover:bg-zinc-200">
      <div className="flex items-center space-x-3  ">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
          disabled={loading} // Disable during API calls
        />
        <span
          className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
        >
          {todo.title}
          {todo.isTemp && <span className="ml-2 text-xs text-gray-500">(Saving...)</span>}
        </span>
        {todo.dueDate && (
          <span className="text-sm text-gray-500">
            {new Date(todo.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700"
        disabled={todo.isTemp}
      >
        {todo.isTemp ? '...' : 'Delete'}
      </button>
    </li>
  );
};

export default TodoItem;
