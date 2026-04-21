import express from 'express';
import {
    createNote,
    getNotesByUserId,
    deleteNote,
    updateNote
} from '../controllers/notesController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', authMiddleware, createNote);
router.get('/', authMiddleware, getNotesByUserId);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

export default router;