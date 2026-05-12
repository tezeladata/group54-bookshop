import express from "express";
import { addBook, deleteBook, editBook, getAllBooks, getSingleBook } from "../controllers/books.controllers.js";

const booksRouter = express.Router();

booksRouter.route("/")
    .get(getAllBooks)
    .post(addBook);

booksRouter.route("/:id")
    .get(getSingleBook)
    .put(editBook)
    .delete(deleteBook);

export default booksRouter;