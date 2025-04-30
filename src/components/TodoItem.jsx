import { useState } from 'react';
import TodoEditForm from './TodoEditForm';
import TodoDisplay from "./TodoDIsplay"

const TodoItem = ({ todo, onToggle, onDelete, onUpdate, currentlyUpdatingId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);
  const isUpdating = currentlyUpdatingId === todo.id;

  const handleSave = () => {
    onUpdate(todo.id, { title: editedTitle, dueDate: editedDueDate });
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col p-3 bg-white rounded-lg shadow mb-2 relative">
      {isEditing ? (
        <TodoEditForm
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          editedDueDate={editedDueDate}
          setEditedDueDate={setEditedDueDate}
          onCancel={() => setIsEditing(false)}
          onSave={handleSave}
          isUpdating={isUpdating}
        />
      ) : (
        <TodoDisplay
          todo={todo}
          onToggle={onToggle}
          onEdit={() => setIsEditing(true)}
          onDelete={onDelete}
          isUpdating={isUpdating}
        />
      )}
    </li>
  );
};

export default TodoItem;
