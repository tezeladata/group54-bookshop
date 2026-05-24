import express from "express";

import { login, logOut, signUp, verify } from "../controllers/auth.contollers.js";
import { protect } from "../middlewares/auth.middleware.js";

// Router
const authRouter = express.Router();

// Sign up
authRouter.post("/signUp", signUp);

// Email verification
authRouter.get("/verify/:code", verify);

// log in
authRouter.post("/logIn", login);

// log out
authRouter.get("/logOut", logOut)

// auto login
authRouter.post("/autoLogin", protect, async (req, res, next) => {
    res.status(200).json(req.user);
})

export default authRouter;