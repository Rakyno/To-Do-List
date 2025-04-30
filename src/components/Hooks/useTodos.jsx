// src/hooks/useTodos.js
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentlyUpdatingId, setCurrentlyUpdatingId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}?_limit=5`);
        setTodos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const generateTempId = () => {
    return 'temp-' + Math.random().toString(36).substr(2, 9);
  };

  const addTodo = async (title, dueDate) => {
    const tempId = generateTempId();
    try {
      setLoading(true);
      const tempTodo = {
        id: tempId,
        title,
        completed: false,
        dueDate: dueDate || new Date().toISOString().split('T')[0],
        isTemp: true
      };
      setTodos(prev => [tempTodo, ...prev]);

      const response = await axios.post(API_URL, {
        title,
        completed: false,
        userId: 1,
        dueDate: tempTodo.dueDate
      });

      setTodos(prev =>
        prev.map(todo => {
          if (todo.id === tempId) {
            const newTodo = { ...response.data, isTemp: false };
            const isIdDuplicate = prev.some(t => t.id === response.data.id && t.id !== tempId);
            return {
              ...newTodo,
              id: isIdDuplicate ? generateTempId() : response.data.id
            };
          }
          return todo;
        })
      );

    } catch {
      setTodos(prev => prev.filter(todo => todo.id !== tempId));
      setError("Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    let newCompletedState;
    try {
      setCurrentlyUpdatingId(id);
      setLoading(true);

      const todoToToggle = todos.find(todo => todo.id === id);
      if (!todoToToggle) return;

      newCompletedState = !todoToToggle.completed;
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, completed: newCompletedState } : todo
        )
      );

      if (todoToToggle.isTemp) return;

      await axios.patch(`${API_URL}/${id}`, {
        completed: newCompletedState
      });

    } catch {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, completed: !newCompletedState } : todo
        )
      );
      setError("Failed to update todo status");
    } finally {
      setCurrentlyUpdatingId(null);
      setLoading(false);
    }
  };

  const updateTodo = async (id, updatedData) => {
    const originalTodo = todos.find(todo => todo.id === id);
    if (!originalTodo) return;

    try {
      setCurrentlyUpdatingId(id);
      setLoading(true);

      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, ...updatedData } : todo
        )
      );

      if (!originalTodo.isTemp) {
        await axios.patch(`${API_URL}/${id}`, updatedData);
      }
    } catch {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? originalTodo : todo
        )
      );
      setError("Failed to update todo");
    } finally {
      setCurrentlyUpdatingId(null);
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    loading,
    error,
    currentlyUpdatingId,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo
  };
};

export default useTodos;
