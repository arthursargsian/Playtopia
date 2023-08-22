import Users from "../models/UserModel.js";


class VerifyUser {
    static verifyUser = async (req, res, next) => {
        if (!req.user_id) {
            return res.status(401).json({msg: "Please log in into your account."})
        }
        const user = await Users.findOne({
            where: {
                uuid: req.user_id
            }
        });
        console.log(user.verifcation)
        if (!user) return res.status(404).json({msg: "User not found."});
        req.userId = user.id;
        req.role = user.role;
        next();
    }

    static   adminOnly = async (req, res, next) => {
        if (!req.user_id) {
            return res.status(401).json({msg: "Please log in into your account."})
        }
        const user = await Users.findOne({
            where: {
                uuid: req.user_id
            }
        });
        if (!user) return res.status(404).json({msg: "Admin not found."});
        if (user.role !== "admin") return res.status(403).json({msg: "You have not enough rights."});
        req.role = user.role;
        next();
    }

    static moderatorOnly = async (req, res, next) => {
        if(!req.user_id) {
            return res.status(401).json({msg: "Please log in into your account"})
        }
        const user = await Users.findOne({
            where: {
                uuid: req.user_id
            }
        });
        if (!user) return res.status(404).json({msg: "Moderator not found."});
        if (!user.role !== "moderaotr") return res.stauts(403).json({msg: "You have not enough rights."});
        req.role = user.role;
        next();
    }

}

    
export default VerifyUser;
