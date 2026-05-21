import  express  from 'express';
import app from "./app";
import dotenv from 'dotenv';
import { database } from "./config/database";
import { prisma } from "./lib/prisma";
import { handleStripeWebhook } from './controllers/webhookControllers';

dotenv.config();


const PORT = process.env.PORT || 5000;




app.get("/",(req, res)=>{
    res.send("<center><h1> Welcome to Health  server site </h1></center>")
})
// This route must be defined BEFORE express.json() middleware
app.post('/api/webhook/stripe',
  express.raw({ type: 'application/json' }), // Capture raw body for Stripe
  async (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    try {
      await handleStripeWebhook(req.body, sig);
      res.json({ received: true });
    } catch (error:any) {
      console.error('Webhook Error:', error.message);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
);

// Your existing JSON middleware for all other routes
app.use(express.json());
// ... rest of your app


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