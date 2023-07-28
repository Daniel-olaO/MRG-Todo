import React, { useState, useEffect} from 'react';
import 'axios'
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
import axios from 'axios';

interface ITask {
  task: any;
  id: number;
  title: string;
  date: Date;
  isCompleted: boolean;
}

const baseUrl: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
const  defaultTask: ITask[] = []

const Task = ({ task }: any) => {
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
                <IconButton>
                  <EditIcon/>
                </IconButton>
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
  const [tasks, setTasks]: [ITask[],(tasks: ITask[]) => void] = useState(defaultTask);
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() =>{
  //   axios.get<ITask[]>(`${baseUrl}/api/task`)
  //   .then( => {
  //     console.log(response)
  //     setLoading(true);
  //     setTasks(response.data);
  //     setLoading(false);
  //   },[]);
  // })
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
          {
          
          }
          {
            tasks.length === 0 &&(
              <h4>No Available Task</h4>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TasksList;
