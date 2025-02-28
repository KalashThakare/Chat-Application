import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoute from "../src/routes/message.route.js";
import cors from "cors";
import { app,server } from "./lib/socket.js";

dotenv.config()

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

const Port = process.env.PORT;


app.use("/auth",authRoutes)
app.use("/messages",messageRoute);

server.listen(Port,()=>{
    console.log(`Server is running on Port-${Port}`);
});