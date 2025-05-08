// src/components/TaskDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState("");

  const fetchTask = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      const single = res.data.find(t => t.id === id);
      setTask(single);
    } catch (error) {
      console.error("Failed to fetch task:", error);
    }
  };

  const toggleCompleted = async () => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        completed: !task.completed
      });
      fetchTask();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      navigate('/');
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await axios.post(`http://localhost:5000/tasks/${id}/comments`, {
        comment
      });
      setComment("");
      fetchTask();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (!task) return <p>Loading task...</p>;

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="btn btn-link mb-3 text-decoration-none">
        ← Back to Tasks
      </button>
  
      <div className="card mb-4 shadow-sm p-3 position-relative">
        <h3 className="card-title">{task.title}</h3>
        <p><strong>Due:</strong> {task.due_date}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
  
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="completedCheckbox"
            checked={task.completed}
            onChange={toggleCompleted}
          />
          <label className="form-check-label" htmlFor="completedCheckbox">
            {task.completed ? 'Completed' : 'Pending'}
          </label>
        </div>
  
        {/* Comments Section */}
        <hr />
        <h5>Milestones / Comments</h5>
        <ul className="list-group mb-3">
          {task.comments && task.comments.length > 0 ? (
            task.comments.map((c, i) => (
              <li key={i} className="list-group-item">
                {c.text}
                <small className="text-muted float-end">
                  {new Date(c.timestamp).toLocaleString()}
                </small>
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">No comments yet.</li>
          )}
        </ul>
  
        <form onSubmit={submitComment}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="2"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Add a new comment..."
            />
          </div>
          <button type="submit" className="btn btn-secondary btn-sm">Add Comment</button>
        </form>
  
        {/* Delete Button: Positioned bottom right */}
        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-danger btn-sm px-3" onClick={deleteTask}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
