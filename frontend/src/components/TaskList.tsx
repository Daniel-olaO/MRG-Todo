import React, { useState, useEffect} from 'react';
import axios, {AxiosResponse} from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import EditForm from './EditForm';

interface ITask {
  task: any;
  id: number;
  title: string;
  date: Date;
  isCompleted: boolean;
}

const baseUrl: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const deleteTask = async(id: string): Promise<AxiosResponse>  => {
  try {
    return axios.delete(`${baseUrl}/delete-task/${id}`);
  } catch (e) {
    console.error('Error deleting task');
  }
}
const completeTask = async(id: string): Promise<AxiosResponse>  => {
  try {
    return axios.put(`${baseUrl}/complete-task/${id}`);
  } catch (e) {
    console.error('Error deleting task');
  }
}
const Task = ({ task }: any) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleEdit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        <TableRow
              key={task.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {task.title}
              </TableCell>
              <TableCell align="right">{task.time.toString()}</TableCell>
              <TableCell align="right">
                <IconButton onClick={handleEdit}>
                  <EditIcon/>
                </IconButton>
                <EditForm open={open} onClose={handleClose}/>
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <Checkbox/>
              </TableCell>
            </TableRow>
    )
}

const TasksList = () => {
  const [tasks, setTasks] = useState<ITask>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() =>{
    setLoading(true);
    axios.get(`${baseUrl}/api/tasks`)
    .then((response: AxiosResponse) => {
      setTasks(response.data);
      console.log(tasks);
      setLoading(false);
    })
  },[]);
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
          {/* if loading display loading */}
          {loading? (
            <h5>Loading Task...</h5>
          ): null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TasksList;
