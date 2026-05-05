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