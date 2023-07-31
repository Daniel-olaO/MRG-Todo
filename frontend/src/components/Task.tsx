import React, { useState } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Checkbox from '@mui/material/Checkbox'
import EditForm from './EditForm'
import axios, { type AxiosResponse } from 'axios'

const API_URL: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api'

export interface TaskProps {
  task: any
  handleTaskUpdate: () => void
}
const deleteTask = async (id: string): Promise<AxiosResponse> => {
  return await axios.delete(`${API_URL}/delete-task/${id}`)
}
const completeTask = async (id: string): Promise<AxiosResponse> => {
  return await axios.put(`${API_URL}/complete-task/${id}`)
}

const Task = (props: TaskProps): React.ReactElement => {
  const { task, handleTaskUpdate } = props
  const [isCompleted, setIsCompleted] = useState<boolean>(task.isCompleted)
  const [open, setOpen] = useState<boolean>(false)

  // MM-DD-YYYY
  const formattedDate = new Date(task.date).toLocaleDateString('en-US')

  const handleEdit = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  const handleDelete = async (id: string): Promise<void> => {
    deleteTask(id).then(() => {
      alert('Task deleted successfully')
      handleTaskUpdate()
    })
      .catch(() => {
        alert('Error deleting task')
        handleTaskUpdate()
      })
  }
  const handleComplete = async (id: string, isCompleted: boolean): Promise<void> => {
    if (isCompleted) {
      completeTask(id)
        .then((response) => {
          console.log(response)
          setIsCompleted(response.data.isCompleted)
        })
      handleTaskUpdate()
    }
  }
  return (
    <TableRow
      key={task}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="right">
        <Checkbox
          checked={task.isCompleted}
          onChange={async () => {
            await handleComplete(task._id, isCompleted)
          }}
        />
      </TableCell>
      <TableCell component="th" scope="row" className='task-cell'>
        {task.title}
      </TableCell>
      <TableCell align="right" className='task-cell'>{formattedDate}</TableCell>
      <TableCell align="right">
        <IconButton onClick={handleEdit}>
          <EditIcon/>
        </IconButton>
        <EditForm open={open}
          onClose={handleClose}
          taskId={task._id}
          handleTaskUpdate={handleTaskUpdate}/>
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={async () => {
          await handleDelete(task._id)
        }}>
          <DeleteIcon style={{ color: 'red' }}/>
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default Task
