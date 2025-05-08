// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const toggleCompletion = async (task) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${task.id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Task List</h2>
      <div className="row g-4">
        {tasks.map((task) => (
          <div key={task.id} className="col-md-4">
            <div
              className="card h-100 shadow-sm border-0 rounded"
              style={{ transition: 'box-shadow 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div className="card-body">
                <h5 className="card-title"> 
                  <Link to={`/tasks/${task.id}`} className="text-decoration-none text-dark">
                  {task.title}
    </Link></h5>
                
                <p className="card-text">
                  <strong>Due:</strong> {task.due_date} <br />
                  <strong>Priority:</strong> {task.priority}
                </p>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`complete-${task.id}`}
                    checked={task.completed}
                    onChange={() => toggleCompletion(task)}
                  />
                  <label className="form-check-label" htmlFor={`complete-${task.id}`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </label>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
