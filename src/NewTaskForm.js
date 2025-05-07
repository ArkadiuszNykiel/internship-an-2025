// src/components/NewTaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

const NewTaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    due_date: '',
    priority: 'medium',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tasks', formData);
      onTaskAdded();
      setFormData({ title: '', due_date: '', priority: 'medium' });
    } catch (error) {
      console.error('Error adding task!', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: '600px' }}>
        <h4 className="text-center mb-4">Submit New Task</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              type="date"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTaskForm;
