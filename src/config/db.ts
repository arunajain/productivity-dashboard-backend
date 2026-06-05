import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;

const connectionString = process.env.POSTGRES_URI;
if (!connectionString)
  throw new Error("POSTGRES_URI is missing in environment varialbles");
const pool = new Pool({
  connectionString,
});

// const res = await pool.query('SELECT current_database()');
// console.log('🧠 Connected to DB:', res.rows[0].current_database);

// pool.query('SELECT NOW()')
//   .then(res => console.log('✅ DB Connected at:', res.rows[0].now))
//   .catch(err => console.error('❌ Connection error:', err));

//   const result = await pool.query(`
//   SELECT table_name
//   FROM information_schema.tables
//   WHERE table_schema = 'public';
// `);

// console.log('Tables:', result.rows);

export default pool;

// import sql from 'mssql';
// const config = {
//   user: process.env.SQL_USER,
//   password: process.env.SQL_PASSWORD,
//   server: process.env.SQL_SERVER,
//   database: process.env.SQL_DATABASE,
//   options: {
//     encrypt: true, // for Azure
//     trustServerCertificate: true // change to true for local dev / self-signed certs
//   }
// };

// async function getUsers(req, res) {
//     try{
//       await sql.connect(config);
//       const result = await sql.query`Select * from users`;
//     }
//     catch (err) {
//         console.error('Error fetching users:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }
