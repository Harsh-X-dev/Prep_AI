import { Router } from "express";

import * as authController from "../controller/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";


const authRouter = Router();

authRouter.post("/register", authController.registerUserController);
authRouter.post("/login", authController.loginUserController);
authRouter.post("/logout", authController.logoutUserController);
authRouter.get("/get-me", authUser,authController.getMeController);


export default authRouter;