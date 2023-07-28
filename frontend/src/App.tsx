import React, {useState} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <TaskList />
      <TaskForm />      
    </div>
  );
}

export default App;
