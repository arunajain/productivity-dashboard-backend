import pool from "../config/db.js";
import type { GoalDataRow, GoalStatus } from "../types/goal.types.js";

class Goal {
  static async createGoal(
    title: string,
    description: string,
    status: GoalStatus,
    due_date: Date | null,
    project_id: number,
  ): Promise<GoalDataRow> {
    const res = await pool.query(
      "INSERT INTO goals(title, description, status, due_date, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, status, due_date ?? null, project_id],
    );
    return res.rows[0];
  }

  static async getAll(user_id: number): Promise<GoalDataRow[]> {
    const res = await pool.query(
      `SELECT g.* FROM goals g JOIN projects p ON g.project_id = p.id WHERE p.user_id = $1;`,
      [user_id],
    );
    return res.rows;
  }

  static async getByProject(project_id: number): Promise<GoalDataRow[]> {
    const res = await pool.query("SELECT * FROM goals WHERE project_id = $1", [
      project_id,
    ]);
    return res.rows;
  }

  static async getById(goal_id: number): Promise<GoalDataRow | undefined> {
    const res = await pool.query("SELECT * FROM goals WHERE id = $1", [
      goal_id,
    ]);
    return res.rows[0];
  }

  static async deleteById(goal_id: number): Promise<void> {
    await pool.query("DELETE FROM goals WHERE id = $1", [goal_id]);
  }

  static async updateById(
    goal_id: number,
    title: string,
    description: string,
    status: GoalStatus,
    weight: number | null,
    due_date: Date | null,
    project_id: number,
  ): Promise<GoalDataRow> {
    const res = await pool.query(
      "UPDATE goals SET title = $1, description = $2, status = $3, weight = $4, due_date = $5, project_id = $6 WHERE id = $7 RETURNING *",
      [
        title,
        description,
        status,
        weight,
        due_date ?? null,
        project_id,
        goal_id,
      ],
    );
    return res.rows[0];
  }
}

export default Goal;
