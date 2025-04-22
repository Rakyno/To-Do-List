import TodoItem from "./TodoItem";
import { useState } from "react";

const TodoList = ({ todos, onToggle, onDelete, loading, currentlyUpdatingId }) => {
  const [sortBy, setSortBy] = useState("completed");

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "completed") {
      return a.completed - b.completed; // incomplete first
    }
    return 0;
  });
  
  return (
    <div className="mb-6">
      <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="p-2 border border-blue-300 hover:border-blue-600 rounded"
  >
    <option value="date">Sort by Date</option>
    <option value="name">Sort by Name</option>
    <option value="completed">Sort by Completion</option>
  </select>
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No todos yet. Add one below!
        </p>
      ) : (
        <ul className="space-y-2 pb-1.5">
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              loading={loading}
              currentlyUpdatingId={currentlyUpdatingId}

            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
