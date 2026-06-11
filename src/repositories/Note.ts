import pool from "../config/db.js";
import type { NoteDataRow, UpdateNoteDTO } from "../types/note.types.js";

class Note {
  static async createNote(
    title: string,
    content: string,
    userId: number,
  ): Promise<NoteDataRow> {
    const res = await pool.query(
      "INSERT INTO notes(title, content, user_id) VALUES ($1, $2, $3) RETURNING id, title, content",
      [title, content, userId],
    );
    return res.rows[0];
  }

  static async getByUserId(userId: number): Promise<NoteDataRow[]> {
    const res = await pool.query(
      "SELECT id, title, content FROM notes WHERE user_id = $1",
      [userId],
    );
    return res.rows;
  }

  static async getById(noteId: number): Promise<NoteDataRow | undefined> {
    const res = await pool.query(
      "SELECT id, title, content FROM notes WHERE id = $1",
      [noteId],
    );
    return res.rows[0];
  }

  static async deleteById(noteId: number): Promise<void> {
    await pool.query("DELETE FROM notes WHERE id = $1", [noteId]);
  }

  static async updateById(data: UpdateNoteDTO): Promise<NoteDataRow> {
    const { noteId, title, content, userId } = data;
    const res = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 and user_id = $4 RETURNING id, title, content",
      [title, content, noteId, userId],
    );
    return res.rows[0];
  }
}
export default Note;
