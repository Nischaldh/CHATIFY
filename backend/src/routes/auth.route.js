import express from "express";
import { login, logout, signup,  updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjectProtection } from "../middleware/arcjet.middleware.js";

const authRouter  = express.Router();

authRouter.use(arcjectProtection);

authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.put("/update-profile",protectRoute,updateProfile)


export default authRouter;