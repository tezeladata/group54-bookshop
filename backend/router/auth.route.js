import express from "express";

import { signUp } from "../controllers/auth.contollers.js";

// Router
const authRouter = express.Router();

// Sign up
authRouter.post("/signUp", signUp);

export default authRouter;