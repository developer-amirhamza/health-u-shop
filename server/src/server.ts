import app from "./app.ts";
import { config } from "dotenv";


const PORT = process.env.PORT || 5000;
config()


app.get("/",(req, res)=>{
    res.send("<center><h1> Welcome to MySoft server site </h1></center>")
})


 app.listen(PORT, async()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})


import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  // Create a connection pool
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  try {
    // Test the connection
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database!');

    // Example query
    const [rows] = await connection.query('SELECT NOW() AS currentTime');
    console.log('Current time from DB:', rows);

    connection.release(); // Release back to pool
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await pool.end(); // Close the pool when done (optional)
  }
}

main();