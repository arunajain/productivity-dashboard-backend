import Todos from '../models/todos.js';

export const createTodo = async (req, res) => {
    try {
        const { title, description, goal_id } = req.body;
        const user_id = req.user.id;
        const newTodo = await Todos.createTodo(title, description, goal_id, user_id);
        res.status(201).json({ msg: 'Todo created successfully', todo: newTodo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const getTodosByUserId = async (req, res) => {
    try {
        const user_id = req.user.id;
        const todos = await Todos.getTodosByUserId(user_id);
        res.status(200).json({ todos });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};  

export const getTodosByGoalId = async (req, res) => {
    try {
        const goal_id = req.params.goal_id;
        const todos = await Todos.getTodosByGoalId(goal_id);
        res.status(200).json({ todos });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};  

export const deleteTodo = async (req, res)  => {
    try {
        const todo_id = req.params.id;
        const todo = await Todos.getTodoById(todo_id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });
        if (todo.user_id !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
        await Todos.deleteTodoById(todo_id);
        res.status(200).json({ msg: 'Todo deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todo_id = req.params.id;
        const { title, content, goal_id, weight, completed } = req.body;
        const todo = await Todos.getTodoById(todo_id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });
        if (todo.user_id !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
        const updatedTodo = await Todos.updateTodoById(todo_id, title, content, goal_id, weight, completed);
        res.status(200).json({ msg: 'Todo updated successfully', todo: updatedTodo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

