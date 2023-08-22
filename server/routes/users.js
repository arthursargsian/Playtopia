import express from "express";
const router = express.Router();

import UsersController from "../controllers/UsersController.js"
import Authorization from "../middlewares/authorization.js";
import VerifyUser from "../middlewares/VerifyUser.js";
import AuthController from "../controllers/AuthController.js";


router.get('/verify/:token', AuthController.verify)
router.post('/update-password/:id', Authorization, VerifyUser.verifyUser, UsersController.updatePassword)
router.get('/get-users', Authorization,VerifyUser.verifyUser, VerifyUser.adminOnly, UsersController.getUsers);
router.get('/get-user/:id', Authorization,UsersController.getUserById);
router.patch('/update-user/:id', Authorization,VerifyUser.verifyUser, VerifyUser.adminOnly, UsersController.updateUser);
router.delete('/delete-user/:id', Authorization,VerifyUser.verifyUser, VerifyUser.adminOnly, UsersController.deleteUser);
router.get('/wishlist/userId', Authorization,VerifyUser.verifyUser)
router.post('/forget-password', AuthController.resetPasswordRequest)
router.post('/reset-password/:token', AuthController.resetPassword)


export default router;