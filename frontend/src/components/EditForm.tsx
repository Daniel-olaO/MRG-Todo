import React, { useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
const baseUrl: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export interface EditFormDialogProps {
  open: boolean;
  onClose: () => void;
}
 interface MyFormValues {
   title: string;
   date: Date;
 }

const ediTtask = async(id: string): Promise<AxiosResponse>  => {
  try {
    return axios.put(`${baseUrl}/update-task/${id}`);
  } catch (e) {
    console.error('Error deleting task');
  }
}
const validationSchema = Yup.object({
  title: Yup
      .string()
      .default('')
      .required('A Task is required'),
  date: Yup
      .date()
      .required('Time is required'),
});

const EditForm =(props: EditFormDialogProps) => {
  const { onClose, open } = props;
  const initialValues: MyFormValues = { title: '', date: new Date()};

  const handleClose = () => {
    onClose();
  };

    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Edit Task</DialogTitle>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        await console.log("hello");
                    }}
                    >
                        {(props)=>(
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
                                Add
                                </Button>
                            </div>
                        </Form>
                        )}
        </Formik>
            </Dialog>
        </div>
    )
}

export default EditForm;