import dotenv from "dotenv";
dotenv.config();
import app from "./app.js"
import connectDB from "./config/database.js"


connectDB();

app.listen(3000,()=>{
    console.log("i am here running on port 3000");
})