import express from 'express';
import { createProject, getProjects, getProjectById, deleteProject, updateProject} from '../controllers/projects.js';
import { verifyToken } from '../middleware/auth.js';
var router = express.Router();

router.use(verifyToken);

router.get('/', getProjects);
router.post('/', createProject);
router.get('/:id', getProjectById);
router.delete('/:id', deleteProject);
router.put('/:id', updateProject);  
export default router;
