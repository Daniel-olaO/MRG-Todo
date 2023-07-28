import React, {useState} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import EditForm from './components/EditForm';

function App() {
  const [showModal,setShowModal] = useState<boolean>(false);
  
    const showModalHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(showModal)
    setShowModal(true);
  };
  return (
    <div className="App">
      <nav className="App-header">
        <h2>MRG-TODO app</h2>
      </nav>
      <TaskList />
      <TaskForm />
      <Button className="btn btn-primary" onClick={showModalHandler}>
        showModal
      </Button>
      
    </div>
  );
}

export default App;
