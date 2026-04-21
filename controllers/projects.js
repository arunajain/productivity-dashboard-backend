import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        const user_id = req.user.id;
        const newProject = await Project.createProject(title, description, user_id);
        res.status(201).json({ msg: 'Project created successfully', project: newProject });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const getProjects = async (req, res) => {
    try {
        const user_id = req.user.id;
        const projects = await Project.getProjectsByUserId(user_id);
        res.status(200).json({ projects });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project_id = req.params.id;
        const project = await Project.getProjectById(project_id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });
        if (project.user_id !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
        res.status(200).json({ project });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project_id = req.params.id;
        const project = await Project.getProjectById(project_id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });
        if (project.user_id !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
        await Project.deleteProjectById(project_id);
        res.status(200).json({ msg: 'Project deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project_id = req.params.id;
        const { title, description } = req.body;
        const project = await Project.getProjectById(project_id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });
        if (project.user_id !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
        const updatedProject = await Project.updateProjectById(project_id, title, description);
        res.status(200).json({ msg: 'Project updated successfully', project: updatedProject });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
}; 

