import express, { Router} from 'express';
import { TaskController } from '../controllers/controllers';
import  Task  from '../interfaces/Tasks';
import MessageResponse from '../interfaces/MessageResponse';
import { validateTask } from '../validations/task';

export const router: Router = express.Router();

/**
 * implements validation for all routes that accept a request.body
 */

router.post<object, MessageResponse>('/create-task',
    validateTask,
    TaskController.create_task
);
router.get<object, Task>('/task/:_id',
    TaskController.get_task
);
router.get<object, Task[]>('/task',
    TaskController.get_all_tasks
);
router.put<object, MessageResponse>('/update-task/:id',
    validateTask,
    TaskController.update_task
);
router.put<object, MessageResponse>('/complete-task/:id',
    TaskController.complete_task
);
router.delete<object, MessageResponse>('/delete-task/:_id',
    TaskController.delete_task
);

