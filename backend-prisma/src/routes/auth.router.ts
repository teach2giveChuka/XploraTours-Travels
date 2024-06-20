import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

let controller = new authController()
let authRouter = Router()

authRouter.post('/login', controller.loginUser)
authRouter.get('/check-details', verifyToken, controller.checkDetails)

export default authRouter