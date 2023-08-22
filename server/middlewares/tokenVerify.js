import HttpErrors  from "http-errors";
import jwt from "jsonwebtoken";
import Users from "../models/UserModel";



const VerifyToken = async(req, res, next) => {
    try{
    const { authorization = ''} = req.headers;
    if(authorization) {
    const { originalUrl, method } = req;
    const { JWT_SECRET } = process.env;
    const token = authorization.replace('Bearer ', '');
    const userInfo = jwt.verify(token, JWT_SECRET);
    const { user_id } = userInfo;
    console.log(user_id)
    const user = await Users.findByPk(user_id);
    req.user_id = user_id;
    next();
}
if(!authorization) {
    next();
}
}
catch(e) {
    next(e);
    }
}

export default VerifyToken;

