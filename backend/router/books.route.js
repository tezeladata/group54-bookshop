import express from "express";
import { getAllBooks } from "../controllers/books.controllers.js";

const booksRouter = express.Router();

booksRouter.route("/")
    .get(getAllBooks)
    // .post();

// booksRouter.route("/:id")
//     .get()
//     .put()
//     .delete();

export default booksRouter;