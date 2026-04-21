import pool from '../config/db.js'; 
export const createNote = async (title, content, userId) => {
  const res = await pool.query(
    'INSERT INTO notes(title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
    [title, content, userId]
  );
  return res.rows[0];
};

export const getNotesByUserId = async (userId) => {
  const res = await pool.query('SELECT * FROM notes WHERE project_id = $1', [projectId]);
  return res.rows;
};

export const getNoteById = async (noteId) => {
  const res = await pool.query('SELECT * FROM notes WHERE id = $1', [noteId]);
  return res.rows[0];
};

export const deleteNoteById = async (noteId) => {
  await pool.query('DELETE FROM notes WHERE id = $1', [noteId]);
};

export const updateNoteById = async (noteId, title, content) => {
  const res = await pool.query(
    'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
    [title, content, noteId]
  );
  return res.rows[0];
};

