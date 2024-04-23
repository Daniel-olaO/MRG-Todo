import express, { Router} from 'express';
import { TaskController } from '../controllers/controllers';
import  Task  from '../interfaces/Tasks';
import MessageResponse from '../interfaces/MessageResponse';

export const router: Router = express.Router();

//task routes
router.post<object, MessageResponse>('/create-task', TaskController.create_task);
router.get<object, Task[]>('/task',  TaskController.get_task);
router.put<object, MessageResponse>('/updatetask/:id', TaskController.update_task);
router.put<object, MessageResponse>('/complete-task/:id', TaskController.complete_task);
router.delete<object, MessageResponse>('/delete-task/:id',  TaskController.delete_task);

