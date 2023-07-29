import React from 'react'
import './App.css'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import Navbar from './components/Navbar'

function App (): React.ReactElement {
  return (
    <div className="App">
      <Navbar />
      <TaskList />
      <TaskForm />
    </div>
  )
}

export default App
