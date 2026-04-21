import pool from '../config/db.js';
export const createTodo = async (title, description, goal_id, user_id) => { 
    const res = await pool.query(
        'INSERT INTO todos (title, description, goal_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, goal_id, user_id]
    );
    return res.rows[0];
};

export const getTodosByGoalId = async (goal_id) => {
    const res = await pool.query(
        'SELECT * FROM todos WHERE goal_id = $1',
        [goal_id]
    );
    return res.rows;
};

export const getTodosByUserId = async (user_id) => {
    const res = await pool.query(
        'SELECT * FROM todos WHERE user_id = $1 ORDER BY weight DESC LIMIT 10', [user_id]
    );
    return res.rows;
};

export const updateTodoById = async (todoid, title, description, goal_id, weight, is_completed) => {
    const res = await pool.query(
        'UPDATE todos SET title = $1, description = $2, goal_id = $3, weight = $4, is_completed = $5 WHERE id = $6 RETURNING *',
        [title, description, goal_id, weight, is_completed, todoid]
    );
    return res.rows[0];
};

export const deleteTodo = async (id) => {
    await pool.query(
        'DELETE FROM todos WHERE id = $1',
        [id]
    );
};

export const getTodoById = async (id) => {
    const res = await pool.query(
        'SELECT * FROM todos WHERE id = $1',
        [id]
    );
    return res.rows[0];
};          
