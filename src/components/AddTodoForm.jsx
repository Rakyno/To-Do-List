import { useState } from "react";
import { FiCalendar } from "react-icons/fi";

const AddTodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, dueDate);
    setTitle("");
    setDueDate("");
  };

  const handleDateSelect = (date) => {
    setDueDate(date);
    setShowDatePicker(false);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 p-2 border rounded focus:outline-none hover:border-blue-700 focus:ring-2 focus: ring-fuchsia-800"
        />
        <button
          type="button"
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="p-2 bg-gray-100 rounded hover:bg-gray-200"
          title="Set due date"
        >
          <FiCalendar />
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800"  
        >
          Add
        </button>
      </div>

      {showDatePicker && (
        <div className="mt-2 p-2 bg-white border rounded shadow-lg">
          <input
            type="date"
            min={today}
            value={dueDate || today}
            onChange={(e) => handleDateSelect(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-between mt-2">
            <button
              type="button"
              onClick={() => handleDateSelect("")}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              No date
            </button>
            <button
              type="button"
              onClick={() => handleDateSelect(today)}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddTodoForm;
