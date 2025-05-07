// src/App.js
import React, { useState } from 'react';
import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';
const App = () => {
  const [refresh, setRefresh] = useState(false);

  // Callback to refresh task list after adding a new task
  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <NewTaskForm onTaskAdded={handleTaskAdded} />
      <TaskList key={refresh} />
    </div>
  );
};

export default App;
