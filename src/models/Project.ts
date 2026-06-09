import pool from "../config/db.js";
import type {
  ProjectData,
  ProjectDataRow,
  ProjectStatus,
} from "../types/project.types.js";

class Project {
  static async createProject(
    title: string,
    description: string,
    status: ProjectStatus,
    due_date: Date | null,
    user_id: number,
  ): Promise<ProjectDataRow> {
    const res = await pool.query(
      "INSERT INTO projects(title, description, status, due_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, status, due_date ?? null, user_id],
    );
    return res.rows[0];
  }

  static async getAll(user_id: number): Promise<ProjectDataRow[]> {
    const res = await pool.query(
      "SELECT id, title, description, weight, status, due_date FROM projects WHERE user_id = $1",
      [user_id],
    );
    return res.rows;
  }

  static async getById(
    project_id: number,
  ): Promise<ProjectDataRow | undefined> {
    const res = await pool.query(
      "SELECT id, title, description, weight, status, due_date FROM projects WHERE id = $1",
      [project_id],
    );
    return res.rows[0];
  }

  static async deleteById(project_id: number): Promise<void> {
    await pool.query("DELETE FROM projects WHERE id = $1", [project_id]);
  }

  static async updateById(
    project_id: number,
    title: string,
    description: string,
    weight: number | null,
    status: ProjectStatus,
    due_date: Date | null,
  ): Promise<ProjectDataRow> {
    const res = await pool.query(
      "UPDATE projects SET title = $1, description = $2, weight = $3, status = $4, due_date = $5 WHERE id = $6 RETURNING *",
      [
        title,
        description,
        weight ?? null,
        status,
        due_date ?? null,
        project_id,
      ],
    );
    return res.rows[0];
  }
}
export default Project;
