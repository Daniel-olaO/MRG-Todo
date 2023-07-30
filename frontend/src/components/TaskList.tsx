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
import Task from './Task';
import ITask from '../interfaces/Task';

const API_URL: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const TasksList = (): React.ReactElement => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`${API_URL}/task`)
      .then((response: AxiosResponse) => {
        setTasks(response.data)
        console.log(response.data)
        setLoading(false)
      })
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {loading
          ? <h5>Loading tasks...</h5>
          : tasks.map((task: ITask) => (
            <Task key={task._id} task={task}/>
          ))
        }
        {tasks.length === 0 && !loading && <h5>No tasks to display</h5>}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TasksList
