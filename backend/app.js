import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Routers
import booksRouter from "./router/books.route.js";
import authRouter from "./router/auth.route.js";

// middlewares and controllers
import globalErrorHandler from "./controllers/error.controllers.js";

// configuration for env variables
dotenv.config()

// create a server
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// routers
app.use("/api/books", booksRouter);
app.use("/api/auth", authRouter)
app.use("/api/status", (req, res, next) => {
    res.status(200).json({status: "Server is running"});
    next()
})

// global error handler
app.use(globalErrorHandler)

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("Server is connected to database!");

        app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
    });