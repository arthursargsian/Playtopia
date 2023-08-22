import express from "express";

const router = express.Router();

import UsersController from "../controllers/UsersController.js"
import Authorization from "../middlewares/authorization.js";
import VerifyUser from "../middlewares/VerifyUser.js";
import AuthController from "../controllers/AuthController.js";
import PaymentController from "../controllers/PaymentController.js"


router.get('/client-secret/:productId', Authorization, PaymentController.getSecret)
router.post('/confirm/', PaymentController.confirm)
router.get('/client-payment/', Authorization, PaymentController.getClientPayments)
router.get('/basket-secret', Authorization, PaymentController.getSecretBasket)
router.post('/confirm-basket', PaymentController.confirmBasket)
export default router;
