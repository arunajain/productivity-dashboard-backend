import express from 'express';

import {
    createTodo,
    getTodosByGoalId,
    getTodosByUserId,
    updateTodoById,
    deleteTodo,
    getTodoById
} from '../controllers/todoController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTodo);

router.get('/', authMiddleware, getTodosByUserId);

router.get('/goal/:goal_id', authMiddleware, getTodosByGoalId);

router.get('/:id', authMiddleware, getTodoById);

router.put('/:id', authMiddleware, updateTodoById);

router.delete('/:id', authMiddleware, deleteTodo);

export default router;