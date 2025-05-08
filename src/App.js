// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';
import TaskDetails from './TaskDetails'; // New

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <NewTaskForm />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
