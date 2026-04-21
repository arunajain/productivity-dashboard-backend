import express from 'express';
import { createGoal, getGoals, getGoalById, deleteGoal, updateGoal} from '../controllers/goals.js';
import { verifyToken } from '../middleware/auth.js';
var router = express.Router();

router.use(verifyToken);

router.get('/', getGoals);
router.post('/', createGoal);
router.get('/:id', getGoalById);
router.delete('/:id', deleteGoal);
router.put('/:id', updateGoal);  
export default router;