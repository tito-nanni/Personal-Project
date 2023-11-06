import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createdUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

export default router;