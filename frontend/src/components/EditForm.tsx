import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
  title: Yup
      .string()
      .default('')
      .required('A Task is required'),
  date: Yup
      .date()
      .required('Time is required'),
});

const style = {
  position:'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
 interface MyFormValues {
   title: string;
   date: Date;
 }
 type Props = {
    isOpen: boolean
 }
const EditForm = ({isOpen}: Props) => {
    const [open, setOpen] = useState<boolean>(isOpen);
    const handleClose = () => setOpen(false);
    const initialValues: MyFormValues = { title: '', date: new Date()};
    return (
        <div className='form-container'>
        <Modal
            open={!open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className='modal-content'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Todo
            </Typography>
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
                    Update Task
                    </Button>
                </div>
                </Form>
            )}
            </Formik>
            </Box>
        </Modal>
        </div>
  )
}

export default EditForm;