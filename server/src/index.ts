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
  // Create a user - fully typed!
  const newUser = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
    },
  })
  console.log('Created user:', newUser)

  // Create a post linked to that user
  const post = await prisma.post.create({
    data: {
      title: 'Hello Prisma',
      content: 'This is my first post with TypeScript',
      authorId: newUser.id,
    },
  })
  console.log('Created post:', post)

  // Query with relations - IntelliSense and type checking
  const usersWithPosts = await prisma.user.findMany({
    where: {
      email: {
        contains: 'example.com',
      },
    },
    include: {
      posts: true,
    },
  })
  console.log('Users with posts:', usersWithPosts)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })