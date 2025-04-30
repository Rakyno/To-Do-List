import { useState } from "react";
import DatePicker from "react-datepicker";
import { FiCalendar } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";

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
        <div className="absolute z-10 mt-2 p-2 bg-white border rounded shadow-lg">
          <DatePicker
            selected={dueDate}
            onChange={(date) => {
              setDueDate(date);
              setShowDatePicker(false); // closes on day select
            }}
            inline
            minDate={new Date()}
          />
          <div className="flex justify-between mt-2">
            <button
              type="button"
              onClick={() => {
                setDueDate(null);
                setShowDatePicker(false);
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              No date
            </button>
            <button
              type="button"
              onClick={() => {
                setDueDate(new Date());
                setShowDatePicker(false);
              }}
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
