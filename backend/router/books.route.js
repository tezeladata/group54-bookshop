import express from "express";
import { addBook, deleteBook, editBook, getAllBooks, getSingleBook } from "../controllers/books.controllers.js";
import {protect} from "../middlewares/auth.middleware.js"
import { allowedTo } from "../controllers/roles.controllers.js";
import upload from "../config/multer.js";

const booksRouter = express.Router();

booksRouter.route("/")
    .get(getAllBooks)
    .post(protect, allowedTo("admin"), upload.array("images", 4), addBook);

booksRouter.route("/:id")
    .get(getSingleBook)
    .put(protect, allowedTo("admin"), editBook)
    .delete(protect, allowedTo("admin"), deleteBook);

export default booksRouter;