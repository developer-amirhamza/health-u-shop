import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import helmet from "helmet"
import morgan from "morgan";
import userRouter from "./routes/user.routes";

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

app.use("/api/user", userRouter)




export default app;