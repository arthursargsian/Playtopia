import HttpErrors from "http-errors";
import jwt from "jsonwebtoken";
import Users from "../models/UserModel";


const EXCLUDE = [
    "GET:/products/discover",
    "POST:/products/discover",
    "POST:/auth/register",
    "POST:/auth/login"
]


const Authorization = async (req, res, next) => {
    try {
        const {authorization = ''} = req.headers;
        const {originalUrl, method} = req;
        if (method === 'OPTIONS' || EXCLUDE.includes(`${method}:${originalUrl.replace(/\?.*/, '')}`)) {
            next();
            return;
        }
        if (!authorization) {
            throw HttpErrors(401, "No jwt provided. Relogin!")
        }
        const {JWT_SECRET} = process.env;
        const token = authorization.replace('Bearer ', '');
        const userInfo = jwt.verify(token, JWT_SECRET);
        const {user_id, stripe} = userInfo;
       const users = await Users.findOne({
            where: {
                uuid: user_id
            },
            attributes:['verified']
        })
        if(users.verified === false) {
            throw HttpErrors(401, "Please your verify your email")
        }
        const user = await Users.findByPk(user_id);
        if (!user) {
            throw HttpErrors(401, 'No user like this.')
        }
        if (user) {
            req.stripe_key = stripe;
            req.user_id = user_id;
            next();
            console.log(stripe)
        }
    } catch (e) {
        next(e);
    }
}

export default Authorization;

