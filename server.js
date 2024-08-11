import "express-async-errors";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
dotEnv.config();
import express from "express";
const app = express();

import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { mongoConnect } from "./db/connect.js";

import userRouter from "./Routes/userRoutes.js";
import authRouter from "./Routes/authRoutes.js";
import classroomRouter from "./Routes/classroomRoutes.js";
import errorHandlerMiddleware from "./Middlewares/errorHandlerMiddleware.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

//middlewares
app.use(cookieParser());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/classroom", classroomRouter);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/dist", "index.html"));
  });

app.use("*", (req,res)=>{
    res.status(404).json({msg:"Route Does Not Exist!"});
})

//error middleware
app.use(errorHandlerMiddleware)

try {
    mongoConnect(process.env.MONGODB_URI);
    app.listen(5100,()=>{
        console.log("server listening to port 5100");
    })
} catch (error) {
    console.log(error);
}