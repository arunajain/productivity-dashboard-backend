import pool from "../config/db.js";
import type {
  TaskDataRow,
  TaskQueryOptions,
  TaskStatus,
} from "../types/task.types.js";

const buildTaskQuery = (options: TaskQueryOptions, user_id: number) => {
  let query = `
    SELECT id, goal_id, user_id, title, description,
           status, is_completed, weight, due_date
    FROM tasks
    WHERE user_id = $1
  `;
  const values: any[] = [user_id];
  if (options.goalId) {
    values.push(options.goalId);
    query += ` AND goal_id = $${values.length}`;
  }

  if (options.status) {
    values.push(options.status);
    query += ` AND status = $${values.length}`;
  }
  query += `ORDER BY ${options?.sortBy ?? "created_at"} ${options?.sortOrder ?? "DESC"}`;

  if (options.limit) {
    values.push(options.limit);
    query += ` LIMIT $${values.length}`;
  }
  if (options.offset) {
    values.push(options.offset);
    query += ` OFFSET $${values.length}`;
  }
  return { query, values };
};

class Task {
  static async createTask(
    goal_id: number,
    user_id: number,
    title: string,
    description: string,
    status: TaskStatus,
    weight: number,
    is_completed: boolean,
    due_date: Date | null,
  ): Promise<TaskDataRow> {
    const res = await pool.query(
      `INSERT INTO tasks (title, description, goal_id, user_id, due_date, status, weight, is_completed)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, goal_id, user_id, title, description, status, is_completed, weight, due_date, is_completed`,
      [
        title,
        description,
        goal_id,
        user_id,
        due_date,
        status,
        weight,
        is_completed,
      ],
    );
    return res.rows[0];
  }

  static async getTasks(
    options: TaskQueryOptions,
    user_id: number,
  ): Promise<TaskDataRow[]> {
    const { query, values } = buildTaskQuery(options, user_id);
    const res = await pool.query(query, values);
    return res.rows;
  }

  static async updateById(
    task_id: number,
    title: string,
    description: string,
    goal_id: number,
    weight: number,
    status: TaskStatus,
    is_completed: boolean,
    user_id: number,
    due_date: Date | null,
  ): Promise<TaskDataRow> {
    const res = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           goal_id = $3,
           weight = $4,
           status = $5
           is_completed = $6,
           due_date= $7
       WHERE id = $8 and user_id = $9
       RETURNING id, goal_id, user_id, title, description, status, is_completed, weight, due_date`,
      [
        title,
        description,
        goal_id,
        weight,
        status,
        is_completed,
        due_date,
        task_id,
        user_id,
      ],
    );

    return res.rows[0];
  }

  static async deleteById(id: number, user_id: number): Promise<void> {
    await pool.query("DELETE FROM tasks WHERE id = $1 and user_id = $2", [
      id,
      user_id,
    ]);
  }

  static async getById(
    id: number,
    user_id: number,
  ): Promise<TaskDataRow | undefined> {
    const res = await pool.query(
      "SELECT id, goal_id, user_id, title, description, status, is_completed, weight, due_date FROM todos WHERE id = $1 and user_id = $2",
      [id, user_id],
    );
    return res.rows[0];
  }
}

export default Task;
