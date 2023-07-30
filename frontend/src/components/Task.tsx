/* eslint-disable import/extensions */
import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import EditForm from './EditForm';
import axios, { type AxiosResponse } from 'axios';

const API_URL: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const deleteTask = async (id: string): Promise<any> => {
  try {
    await axios.delete(`${API_URL}/delete-task/${id}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response: AxiosResponse) => {
        console.log(response);
      })
  } catch (e) {
    console.error(e);
  }
}
const completeTask = async (id: string): Promise<any> => {
  try {
    return await axios.put(`${API_URL}/complete-task/${id}`)
  } catch (e) {
    console.error(e);
  }
}

const Task = ({ task }: any): React.ReactElement => {
  const [isCompleted, setIsCompleted] = useState<boolean>(task.isCompleted);
  const [open, setOpen] = useState<boolean>(false);

  // MM-DD-YYYY
  const formattedDate = new Date(task.date).toLocaleDateString('en-US');

  const handleEdit = (): void => {
    setOpen(true);
  }
  const handleClose = (): void => {
    setOpen(false);
  }
  const handleDelete = async (id: string): Promise<void> => {
    const response = await deleteTask(id);
    console.log(response);
  }
  const handleComplete = async (id: string, isCompleted: boolean): Promise<void> => {
    if (!isCompleted) {
      const response = await completeTask(id)
      setIsCompleted(true)
      console.log(response)
    }
  }
  return (
    <TableRow
      key={task}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row" className='task-cell'>
        {task.title}
      </TableCell>
      <TableCell align="right" className='task-cell'>{formattedDate}</TableCell>
      <TableCell align="right">
        <IconButton onClick={handleEdit}>
          <EditIcon/>
        </IconButton>
        <EditForm open={open} onClose={handleClose} taskId={task._id}/>
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={async() => {
          await handleDelete(task._id);
        }}>
          <DeleteIcon style={{ color: 'red' }}/>
        </IconButton>
      </TableCell>
      <TableCell align="right">
        <Checkbox
          checked={isCompleted}
          onChange={async() => {
            await handleComplete(task._id, isCompleted);
          }}
        />
      </TableCell>
    </TableRow>
  )
}

export default Task;
