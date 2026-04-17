import pool from '../config/db.js';
export const createGoal = async (title, description, project_id) => {
  const res = await pool.query(
    'INSERT INTO goals(title, description, project_id) VALUES ($1, $2, $3) RETURNING *',
    [title, description, project_id]
  );
  return res.rows[0];
};

export const getGoalsByProjectId = async (project_id) => {
  const res = await pool.query('SELECT * FROM goals WHERE project_id = $1', [project_id]);
  return res.rows;
};

export const getGoalById = async (goal_id) => {
  const res = await pool.query('SELECT * FROM goals WHERE id = $1', [goal_id]);
  return res.rows[0];
};

export const deleteGoalById = async (goal_id) => {
  await pool.query('DELETE FROM goals WHERE id = $1', [goal_id]);
};

export const updateGoalById = async (goal_id, title, description) => {
  const res = await pool.query(
    'UPDATE goals SET title = $1, description = $2 WHERE id = $3 RETURNING *',
    [title, description, goal_id]
  );
  return res.rows[0];
};
