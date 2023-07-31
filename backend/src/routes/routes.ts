import express, { Router} from 'express';
import { TaskController } from '../controllers/controllers';
import { validateTask } from '../validations/task';

export const router: Router = express.Router();

/**
 * implements validation for all routes that accept a request.body
 */

router.post('/create-task',
    validateTask,
    TaskController.create_task
);
router.get('/task/:_id',
    TaskController.get_task
);
router.get('/task',
    TaskController.get_all_tasks
);
router.put('/update-task/:id',
    validateTask,
    TaskController.update_task
);
router.put('/complete-task/:id',
    TaskController.complete_task
);
router.delete('/delete-task/:_id',
    TaskController.delete_task
);

