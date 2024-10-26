// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const apiUrl = 'http://127.0.0.1:3000/tasks';

  const fetchTasks = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!newTask) return;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTask, completed: false }),
    });

    if (response.ok) {
      setNewTask('');
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await fetch(`${apiUrl}/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !task.completed }),
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Do List</h1>
      <input
        type="text"
        className="todo-input"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button className="todo-button" onClick={addTask}>Add</button>
      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className="todo-item">
            <span
              className={`todo-text ${task.completed ? 'completed' : ''}`}
              onClick={() => toggleTask(task)}
            >
              {task.title}
            </span>
            <button className="todo-delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
