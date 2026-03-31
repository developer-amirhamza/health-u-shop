import app from "./app";
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { database } from "./config/database";
dotenv.config();


const PORT = process.env.PORT || 5000;



app.get("/",(req, res)=>{
    res.send("<center><h1> Welcome to MySoft server site </h1></center>")
})


 app.listen(PORT, async()=>{
    console.log(`server is running at http://localhost:${PORT}`)
});

database()


