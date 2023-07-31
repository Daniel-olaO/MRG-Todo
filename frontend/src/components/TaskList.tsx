/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios, { type AxiosResponse } from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Task from './Task';
import TaskForm from './TaskForm';
import ITask from '../interfaces/Task';

const API_URL: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const getTasks = async (): Promise<AxiosResponse> => {
  return await axios.get(`${API_URL}/task`);
}
const TasksList = (): React.ReactElement => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const handleAdd = (): void => {
    setOpen(true)
    setLoading(true)
    getTasks().then((response: AxiosResponse) => {
      setTasks(response.data)
      setLoading(false)
    });
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  const handleTaskUpdate = async () => {
      const response = await getTasks();
      setTasks(response.data);
  };

  useEffect(() => {
    setLoading(true)
    getTasks()
      .then((response: AxiosResponse) => {
        setTasks(response.data)
        setLoading(false)
      })
  }, [])
  return (
    <Container>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Status</TableCell>
            <TableCell>Task</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {loading
          ? <h5>Loading tasks...</h5>
          : tasks.map((task: ITask) => (
            <Task key={task._id} task={task} handleTaskUpdate={handleTaskUpdate}/>
          ))
        }
        {tasks.length === 0 && !loading && <h5>No tasks to display</h5>}
        </TableBody>
      </Table>
    </TableContainer>
    <div className="add-btn-container">
      <Button variant="contained"
        className='add-btn'
        onClick={handleAdd}>
          Add Task
      </Button>
      <TaskForm open={open} onClose={handleClose}/>
    </div>
    </Container>
  )
}

export default TasksList
