import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors( {
  origin: process.env.ORIGIN ,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
export default app;
