import Goals from "../models/Goals.js";
export const createGoal = async (req, res) => {
    try {
        const { title, description, project_id } = req.body;
        const user_id = req.user.id;
        const newGoal = await Goals.createGoal(title, description, project_id, user_id);
        res.status(201).json({ msg: 'Goal created successfully', goal: newGoal });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const getGoalsByProjectId = async (req, res) => {
    try {
        const project_id = req.params.projectId;
        const goals = await Goals.getGoalsByProjectId(project_id);
        res.status(200).json({ goals });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};  

export const deleteGoal = async (req, res) => {
    try {
        const goal_id = req.params.id;
        const goal = await Goals.getGoalById(goal_id);
        if (!goal) return res.status(404).json({ msg: 'Goal not found' });
        if (goal.user_id !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
        await Goals.deleteGoalById(goal_id);
        res.status(200).json({ msg: 'Goal deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const updateGoal = async (req, res) => {
    try {
        const goal_id = req.params.id;
        const { title, description } = req.body;
        const goal = await Goals.getGoalById(goal_id);
        if (!goal) return res.status(404).json({ msg: 'Goal not found' });
        if (goal.user_id !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
        const updatedGoal = await Goals.updateGoalById(goal_id, title, description);
        res.status(200).json({ msg: 'Goal updated successfully', goal: updatedGoal });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

