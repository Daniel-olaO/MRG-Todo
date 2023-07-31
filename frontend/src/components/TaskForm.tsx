import React from 'react';
import axios, { type AxiosResponse } from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const API_URL: any = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export interface AddFormDialogProps {
  open: boolean
  onClose: () => void
}
interface MyFormValues {
  title: string
  date: Date
}

const addTask = async (newTask: any): Promise<AxiosResponse> => {
  return await axios.post(`${API_URL}/create-task`, newTask, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
const validationSchema = Yup.object({
  title: Yup
    .string()
    .default('')
    .required('A Task is required'),
  date: Yup
    .date()
    .required('Date is required')
});

const TaskForm = (props: AddFormDialogProps): React.ReactElement => {
  const { onClose, open } = props;
  const initialValues: MyFormValues = { title: '', date: new Date() };

  const handleCreate = async (task: any): Promise<void> => {
    addTask(task).then(() => {
      onClose();
    })
      .catch(() => {
        alert('Error creating task: try selecting a later date');
      });
  }

  const handleClose = (): void => {
    onClose();
  }

  return (
    <Dialog onClose={handleClose} open={open} className='dialog-box'>
      <DialogTitle>Add Task</DialogTitle>
      <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await handleCreate(values);
          }}
          >
          {(props) => (
            <Form>
              <div className="form-group">
                  <Field name="title" type="text"
                  as={TextField} label="Task" variant="filled"
                  />
                  <ErrorMessage name="title" component="div" className="error"/>
              </div>
              <div className="form-group">
                  <Field name="date" type="date"
                  as={TextField} label="date"
                  variant="filled"/>
                  <ErrorMessage name="date" component="div"className="error"/>
              </div>
              <div className="form-group">
                  <Button type="submit" variant="contained" color="primary">
                  Add Task
                  </Button>
              </div>
          </Form>
          )}
      </Formik>
    </Dialog>
  );
}

export default TaskForm;
