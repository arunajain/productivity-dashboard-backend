import pool from "../config/db.js";
import type { TodoData } from "../types/task.types.js";

class Todo {
  static async createTodo(
    title: string,
    description: string,
    goal_id: number,
    user_id: number,
  ): Promise<TodoData> {
    const res = await pool.query(
      `INSERT INTO todos (title, description, goal_id, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, goal_id, user_id],
    );

    return res.rows[0];
  }

  static async getByGoalId(goal_id: number): Promise<TodoData[]> {
    const res = await pool.query("SELECT * FROM todos WHERE goal_id = $1", [
      goal_id,
    ]);

    return res.rows;
  }

  static async getByUserId(user_id: number): Promise<TodoData[]> {
    const res = await pool.query(
      `SELECT *
       FROM todos
       WHERE user_id = $1
       ORDER BY weight DESC
       LIMIT 10`,
      [user_id],
    );

    return res.rows;
  }

  static async updateById(
    todoId: number,
    title: string,
    description: string,
    goal_id: number,
    weight: number,
    is_completed: boolean,
  ): Promise<TodoData> {
    const res = await pool.query(
      `UPDATE todos
       SET title = $1,
           description = $2,
           goal_id = $3,
           weight = $4,
           is_completed = $5
       WHERE id = $6
       RETURNING *`,
      [title, description, goal_id, weight, is_completed, todoId],
    );

    return res.rows[0];
  }

  static async deleteById(id: number): Promise<void> {
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  }

  static async getById(id: number): Promise<TodoData | undefined> {
    const res = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    return res.rows[0];
  }
}

export default Todo;
