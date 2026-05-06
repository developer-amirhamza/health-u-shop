import app from "./app";
import dotenv from 'dotenv';
import { database } from "./config/database";
import { prisma } from "./lib/prisma";

dotenv.config();


const PORT = process.env.PORT || 5000;




app.get("/",(req, res)=>{
    res.send("<center><h1> Welcome to Health  server site </h1></center>")
})


 app.listen(PORT, async()=>{
    console.log(`server is running at http://localhost:${PORT}`)
});

// database()



async function main() {
  console.log("Database connected successfully!")
// const users = await prisma.user.findMany();
// console.log("user",users)
};
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })