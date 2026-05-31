import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import helmet from "helmet"
import morgan from "morgan";
import userRouter from "./routes/user.routes";
import productRouter from "./routes/products.routes";
import cartRouter from "./routes/cart.routes";
import orderRouter from "./routes/order.routes";
import paymentRouter from "./routes/payment.route";
import categoryRouter from "./routes/category.route";
import reviewRouter from "./routes/review.routes"

config();
const app = express();
app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL,
}))

app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({
    crossOriginEmbedderPolicy:false,
}));

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cart",cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payment",paymentRouter);




export default app;