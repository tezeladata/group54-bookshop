import express from "express";
import { addBook, deleteBook, editBook, getAllBooks, getSingleBook } from "../controllers/books.controllers.js";
import {protect} from "../middlewares/auth.middleware.js"
import { allowedTo } from "../controllers/roles.controllers.js";

const booksRouter = express.Router();

booksRouter.route("/")
    .get(getAllBooks)
    .post(protect, allowedTo("admin"), addBook);

booksRouter.route("/:id")
    .get(getSingleBook)
    .put(protect, allowedTo("admin"), editBook)
    .delete(protect, allowedTo("admin"), deleteBook);

export default booksRouter;