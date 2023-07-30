import React from 'react';
import axios, { type AxiosResponse, type AxiosError } from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const API_URL: any = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export interface EditFormDialogProps {
  open: boolean
  taskId: string
  onClose: () => void
}
interface MyFormValues {
  title: string
  date: Date
}

const editTask = async (id: string, newTask: any): Promise<AxiosResponse> => {
  return await axios.put(`${API_URL}/update-task/${id}`, newTask, {
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
    .required('Time is required')
});

const EditForm = (props: EditFormDialogProps): React.ReactElement => {
  const { onClose, open, taskId } = props;
  const initialValues: MyFormValues = { title: '', date: new Date() };

  const handleEdit = async (id: string, task: any): Promise<void> => {
    editTask(id, task).then(() => {
      onClose();
    })
      .catch(() => {
        alert('Error editing task: try selecting a later date');
      });
  }

  const handleClose = (): void => {
    onClose();
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Edit Task</DialogTitle>
      <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await handleEdit(taskId, values);
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
                  Edit Task
                  </Button>
              </div>
          </Form>
          )}
      </Formik>
    </Dialog>
  );
}

export default EditForm
