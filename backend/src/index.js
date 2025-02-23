import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config()
const app =express();
connectDB();

app.use(express.json());
app.use(cookieParser());

const Port = process.env.PORT


app.use("/auth",authRoutes)

app.listen(Port,()=>{
    console.log(`Server is running on Port-${Port}`);
});