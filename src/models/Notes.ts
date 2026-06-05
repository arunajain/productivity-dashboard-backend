import pool from "../config/db.js";
import type { NoteData } from "../types/note.types.js";

class Note {
  static async createNote(
    title: string,
    content: string,
    userId: number,
  ): Promise<NoteData> {
    const res = await pool.query(
      "INSERT INTO notes(title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, userId],
    );
    return res.rows[0];
  }

  static async getByUserId(userId: number): Promise<NoteData[]> {
    const res = await pool.query("SELECT * FROM notes WHERE user_id = $1", [
      userId,
    ]);
    return res.rows;
  }

  static async getById(noteId: number): Promise<NoteData | undefined> {
    const res = await pool.query("SELECT * FROM notes WHERE id = $1", [noteId]);
    return res.rows[0];
  }

  static async deleteById(noteId: number): Promise<void> {
    await pool.query("DELETE FROM notes WHERE id = $1", [noteId]);
  }

  static async updateById(
    noteId: number,
    title: string,
    content: string,
  ): Promise<NoteData> {
    const res = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, noteId],
    );
    return res.rows[0];
  }
}
export default Note;
