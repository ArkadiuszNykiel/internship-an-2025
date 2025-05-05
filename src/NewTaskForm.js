// src/components/NewTaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

const NewTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, due_date: dueDate, priority };
      await axios.post('http://localhost:5000/tasks', newTask);
      onTaskAdded(); // Notify parent to refresh task list
      setTitle('');
      setDueDate('');
      setPriority('');
    } catch (error) {
      console.error('There was an error adding the task!', error);
    }
  };

  return (
    <div>
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default NewTaskForm;
