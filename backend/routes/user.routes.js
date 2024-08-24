import express from "express";
import { login, register, updateProfile ,logout } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const userRoute=express.Router();

userRoute.route("/register").post(register);
userRoute.route("/login").post(login);
userRoute.route("/profile/update").post(isAuthenticated,updateProfile);  
userRoute.route("/logout").get(logout) ;

export default userRoute;    //we have to send this router 
