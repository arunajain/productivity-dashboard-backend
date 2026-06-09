import express from 'express';

import {
    createTodo,
    getTodosByGoalId,
    getTodosByUserId,
    updateTodoById,
    deleteTodo,
    getTodoById
} from '../controllers/todos.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, createTodo);

router.get('/', verifyToken, getTodosByUserId);

router.get('/goal/:goal_id', verifyToken, getTodosByGoalId);

router.get('/:id', verifyToken, getTodoById);

router.put('/:id', verifyToken, updateTodoById);

router.delete('/:id', verifyToken, deleteTodo);

export default router;