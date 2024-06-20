import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const user_router = Router();
const user_controller = new UserController();

user_router.post('/register', user_controller.createUser)
user_router.get('/all', user_controller.viewAllUsers)
user_router.delete('/delete/:userId', user_controller.deleteUser)
user_router.put('/update/:userId', user_controller.updateUser)
user_router.get('/count', user_controller.userCount)
user_router.get('/:userId', user_controller.getUserById)
user_router.put('/softdelete/:userId', user_controller.softDeleteUser)
user_router.put('/restore/:userId', user_controller.restoreUser)

export default user_router;