import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js"

export const signUp = catchAsync(async (req, res, next) => {
    const {fullname, email, password} = req.body;
    const newUser = await User.create({fullname, email, password});

    res.status(200).json(newUser)
});