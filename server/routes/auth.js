import express from "express";
import AuthController from "../controllers/AuthController.js";
import UsersController from "../controllers/UsersController.js";
import VerifyUser from '../middlewares/VerifyUser.js';

const router = express.Router();

router.post('/register', UsersController.createUser);
router.get('/profile', AuthController.myAccount);
router.post('/login', AuthController.Login);
router.delete('/logout', AuthController.logOut);
router.post('/createAdmin', VerifyUser.verifyUser, VerifyUser.adminOnly, UsersController.createAdmin);
router.get('/adminpage', VerifyUser.adminOnly, VerifyUser.verifyUser)


export default router;