/* eslint-disable import/extensions */
import React from 'react'
import './App.css'
import TaskList from './components/TaskList'
import Navbar from './components/Navbar'

function App (): React.ReactElement {
  return (
    <div className="App">
      <Navbar />
      <TaskList />
    </div>
  )
}

export default App
