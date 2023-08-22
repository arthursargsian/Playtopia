import express from "express";
import auth from "./auth";
import users from "./users";
import products from "./products";
import payment from "./payment"
import chat from "./chat.js";
import Authorization from "../middlewares/authorization";

const router = express.Router();

router.get('/', function (req, res, next) {
    res.json({title: 'Express'});
});

router.use('/payment', payment)
router.use('/chat', chat)
router.use('/auth', Authorization, auth);
router.use('/users', users);
router.use('/products', products);

export default router;
