import React, { useState, useEffect } from 'react'
import axios, { type AxiosResponse } from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Checkbox from '@mui/material/Checkbox'
import EditForm from './EditForm'

interface ITask {
  id: number
  title: string
  date: Date
  isCompleted: boolean
}

const API_URL: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const deleteTask = async (id: string): Promise<any> => {
  try {
    return axios.delete(`${API_URL}/delete-task/${id}`,
    {headers: {
      'Content-Type': 'application/json',
    }
    })
    .then((response: AxiosResponse) => {
      console.log(response);
    })
  } catch (e) {
    console.error(e)
  }
}
const completeTask = async (id: string): Promise<any> => {
  try {
    return await axios.put(`${API_URL}/complete-task/${id}`)
  } catch (e) {
    console.error(e)
  }
}
const Task = ({ task }: any):React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(task.isCompleted);

  const handleEdit = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  const handleDelete = async(id: string) => {
    const response = await deleteTask(id);
    console.log(response);
  }
  const handleComplete = async(id: string, isCompleted:boolean) => {
    if (!isCompleted) {
      const response = await completeTask(id);
      setIsCompleted(true);
      console.log(response);
    }
  }
  return (
    <TableRow
      key={task}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {task.title}
      </TableCell>
      <TableCell align="right">{task.date}</TableCell>
      <TableCell align="right">
        <IconButton onClick={handleEdit}>
          <EditIcon/>
        </IconButton>
        <EditForm open={open} onClose={handleClose}  taskId={task._id}/>
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={()=>handleDelete(task._id)}>
          <DeleteIcon/>
        </IconButton>
      </TableCell>
      <TableCell align="right">
        <Checkbox
          checked={isCompleted}
          onChange={()=>handleComplete(task._id, isCompleted)}
        />
      </TableCell>
    </TableRow>
  )
}

const TasksList = ():React.ReactElement => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`${API_URL}/tasks`)
      .then((response: AxiosResponse) => {
        setTasks(response.data);
        console.log(response.data);
        setLoading(false);
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
        {loading? <h5>Loading tasks...</h5> : tasks.map((task: ITask) => (
            <Task key={task.id} task={task}/>
          ))  
        }
        {tasks.length === 0 && !loading && <h5>No tasks to display</h5>}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TasksList
