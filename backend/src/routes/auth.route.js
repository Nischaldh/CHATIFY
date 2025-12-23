import express from "express";
import { login, logout, signup,  updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjectProtection } from "../middleware/arcjet.middleware.js";

const authRouter  = express.Router();

// authRouter.use(arcjectProtection);

authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.put("/update-profile",protectRoute,updateProfile)
authRouter.get("/check",protectRoute,(req,res)=>{{
    console.log("Auth check route hit");
    res.status(200).json(req.authUser);
}});


export default authRouter;