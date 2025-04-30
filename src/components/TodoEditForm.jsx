import { FiSave, FiX } from 'react-icons/fi';
import DatePicker from 'react-datepicker';

const TodoEditForm = ({
  editedTitle,
  setEditedTitle,
  editedDueDate,
  setEditedDueDate,
  onCancel,
  onSave,
  isUpdating
}) => (
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
      onChange={(date) => setEditedDueDate(date)}
      inline
      minDate={new Date()}
    />
    <div className="flex space-x-2 justify-end">
      <button
        onClick={onCancel}
        className="p-2 text-gray-500 hover:text-gray-700"
        disabled={isUpdating}
      >
        <FiX />
      </button>
      <button
        onClick={onSave}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        disabled={isUpdating}
      >
        {isUpdating ? <span className="animate-spin mr-2">↻</span> : <FiSave className="mr-1" />}
        Save
      </button>
    </div>
  </div>
);

export default TodoEditForm;
