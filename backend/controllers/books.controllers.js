import AppError from "../utils/AppError.js";
import Readfile from "../utils/Readfile.js";
import Writefile from "../utils/Writefile.js";
import catchAsync from "../utils/catchAsync.js"

export const getAllBooks = catchAsync(async (req, res, next) => {
    const allBooks = await Readfile(process.env.DB);
    
    if (allBooks.length === 0) {
        return next(new AppError("No books are available!", 400))
    };

    res.status(200).json(allBooks)
});

export const getSingleBook = catchAsync(async (req, res, next) => {
    const allBooks = await Readfile(process.env.DB);
    const {id} = req.params;

    const foundBook = allBooks.filter(book => book.id === id);
    if (foundBook.length === 0) {
        return next(new AppError(`No book found with id ${id}`, 404))
    };

    res.status(200).json(foundBook)
});

export const addBook = catchAsync(async (req, res, next) => {
    let allBooks = await Readfile(process.env.DB);
    const bookData = req.body;

    // check if book already exists
    if (allBooks.some(book => book.id === bookData.id)) {
        return next(new AppError("Book already exists!", 400));
    }

    const allProperties = [
        ["id", "string"],
        ["title", "string"],
        ["author", "object"],
        ["category", "string"],
        ["price", "number"],
        ["stockQuantity", "number"],
        ["tags", "object"], // arrays return "object" with typeof
        ["reviews", "object"], // arrays return "object" with typeof
        ["createdAt", "string"]
    ];

    // check if all properties in bookData are valid and also their values are in correct format - correct data type
    for (let key in bookData) {
        let propValid = false;

        for (let propArr of allProperties) {
            if (propArr[0] === key && propArr[1] === typeof bookData[key]) {
                propValid = true;
                break;
            }
        }

        if (!propValid) {
            return next(new AppError("Invalid data to create book!", 400));
        }
    }

    // check if we don't have extra or less properties than it is needed
    if (Object.keys(bookData).length !== allProperties.length) {
        return next(new AppError("Invalid number of properties for book to add it in database", 400));
    }

    // check if author object exists and its properties are valid
    if (
        !bookData.author ||
        Array.isArray(bookData.author) ||
        typeof bookData.author !== "object" ||
        Object.keys(bookData.author).length !== 2 ||
        typeof bookData.author.fullName !== "string" ||
        typeof bookData.author.nationality !== "string"
    ) {
        return next(new AppError("Invalid data in book's author object for book to be added in database!", 400));
    }

    // check if tags property is not empty and all values are strings
    if (
        !Array.isArray(bookData.tags) ||
        bookData.tags.length === 0 ||
        bookData.tags.some(el => typeof el !== "string")
    ) {
        return next(new AppError("Invalid data in book's tags array for book to be added in database!", 400));
    }

    // check if following criterias are meet:
    //      reviews array is not empty
    //      reviews array has items, whose datatypes are objects,
    //      all objects have 3 properties: username, rating, comment
    //      all object properties have correct values (their datatypes are correct)
    if (
        !Array.isArray(bookData.reviews) ||
        bookData.reviews.length === 0
    ) {
        return next(new AppError("Book's reviews array shouldn't be empty", 400));
    }

    if (
        bookData.reviews.some(
            el => typeof el !== "object" || Array.isArray(el) || el === null
        )
    ) {
        return next(new AppError("Invalid data in book's reviews array for book to be added in database!", 400));
    }

    const reviewProperties = [
        ["username", "string"],
        ["rating", "number"],
        ["comment", "string"]
    ];

    for (const reviewObject of bookData.reviews) {
        if (Object.keys(reviewObject).length !== 3) {
            return next(new AppError("Invalid number of properties in book's reviews object for book to be added in database!", 400));
        }

        for (let key in reviewObject) {
            let propValid = false;

            for (let propArr of reviewProperties) {
                if (propArr[0] === key && propArr[1] === typeof reviewObject[key]) {
                    propValid = true;
                    break;
                }
            }

            if (!propValid) {
                return next(new AppError("Invalid data in book's reviews object for book to be added in database!", 400));
            }
        }
    }

    allBooks.push(bookData);
    await Writefile(process.env.DB, allBooks);

    return res.status(201).json({
        message: "Book added successfully!",
        book: bookData
    });
});

export const deleteBook = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    let allBooks = await Readfile(process.env.DB);

    const bookToDelete = allBooks.filter(book => book.id === id)
    if (bookToDelete.length === 0) {
        return next(new AppError(`Book with id ${id} does not exist`, 404))
    };

    allBooks = allBooks.filter(book => book.id !== id);
    await Writefile(process.env.DB, allBooks);
    return res.status(204).json()
});