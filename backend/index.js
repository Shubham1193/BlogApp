import express from "express";
import dotenv from 'dotenv'
const app = express();
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import cors from 'cors'
import cookieParser from "cookie-parser";
import { verifyToken } from '../utils/verifyUser.js'



app.use(cors())
app.use(cookieParser())

dotenv.config()
app.use(express.json())

mongoose
  .connect(
    process.env.MONGO
  ).then(() => {
    console.log("Database connected")
  }).catch((err) => {
    console.log(err)
  })

app.use("/api/user" , userRoutes)
app.use("/api/auth" , authRoutes)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


app.use((err , req , res , next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})