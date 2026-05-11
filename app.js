import express from 'express';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cookieParser())
import authRouter from "./routes/auth.routes.js"
import interviewRouter from "./routes/interview.rotes.js"

app.use("/api/auth",authRouter)
app.use("/api/interview", interviewRouter)
export default app;