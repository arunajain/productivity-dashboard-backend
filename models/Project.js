import pool from '../config/db.js';

export const createProject = async (title, description, user_id) => {
  const res = await pool.query(
    'INSERT INTO projects(title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
    [title, description, user_id]
  );
  return res.rows[0];
};

export const getProjectsByUserId = async (user_id) => {
  const res = await pool.query('SELECT * FROM projects WHERE user_id = $1', [user_id]);
  return res.rows;
};

export const getProjectById = async (project_id) => {
  const res = await pool.query('SELECT * FROM projects WHERE id = $1', [project_id]);
  return res.rows[0];
};

export const deleteProjectById = async (project_id) => {
  await pool.query('DELETE FROM projects WHERE id = $1', [project_id]);
};

export const updateProjectById = async (project_id, title, description) => {
  const res = await pool.query(
    'UPDATE projects SET title = $1, description = $2 WHERE id = $3 RETURNING *',
    [title, description, project_id]
  );
  return res.rows[0];
};
