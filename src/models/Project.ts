import pool from "../config/db.js";
import type { ProjectData } from "../types/project.types.js";
class Project {
  static async createProject(
    title: string,
    description: string,
    user_id: number,
  ): Promise<ProjectData> {
    const res = await pool.query(
      "INSERT INTO projects(title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, user_id],
    );
    return res.rows[0];
  }

  static async getByUserId(user_id: number): Promise<ProjectData[]> {
    const res = await pool.query("SELECT * FROM projects WHERE user_id = $1", [
      user_id,
    ]);
    return res.rows;
  }

  static async getById(project_id: number): Promise<ProjectData | undefined> {
    const res = await pool.query("SELECT * FROM projects WHERE id = $1", [
      project_id,
    ]);
    return res.rows[0];
  }

  static async deleteById(project_id: number): Promise<void> {
    await pool.query("DELETE FROM projects WHERE id = $1", [project_id]);
  }

  static async updateById(
    project_id: number,
    title: string,
    description: string,
  ): Promise<ProjectData> {
    const res = await pool.query(
      "UPDATE projects SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, project_id],
    );
    return res.rows[0];
  }
}
