import express, { Router} from 'express';
import { User, Task} from '../controllers/controllers';

export const router: Router = express.Router();

//user routes
router.post('/register', User.register_user);
router.post('/login', User.check_user);

//task routes
router.post('/create-task', Task.create_task);
router.get('/task/:userId', Task.get_task)
router.put('/updatetask/:id', Task.update_task);
router.put('/complete-task/:id', Task.complete_task);
router.delete('/delete-task/:id', Task.delete_task);

