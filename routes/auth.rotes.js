import { Router } from "express";

import * as authController from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", authController.registerUserController);
authRouter.post("/login", authController.loginUserController);
authRouter.post("/logout", authController.logoutUserController);
// authRouter.post("/get-me", authController.getMeUserController);


export default authRouter;