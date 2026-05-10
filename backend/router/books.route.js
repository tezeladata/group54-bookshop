import express from "express";
import { addBook, deleteBook, getAllBooks, getSingleBook } from "../controllers/books.controllers.js";

const booksRouter = express.Router();

booksRouter.route("/")
    .get(getAllBooks)
    .post(addBook);

booksRouter.route("/:id")
    .get(getSingleBook)
    .delete(deleteBook);

export default booksRouter;