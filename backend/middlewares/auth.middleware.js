import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";

export const protect = catchAsync((req, res, next) => {
    const token = req.cookies.lg;

    if (!token) {
        return next(new AppError("You are not logged in! Please log in to complete this operation!", 401));
    };

    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
        return next(new AppError("You are not logged in! Please log in to complete this operation!", 401));
    };

    req.user = user;
    next();
})