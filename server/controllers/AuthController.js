import Users from "../models/UserModel.js"
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import HTML_TEMPLATE_PASSWORD from "../htmltemp/passwordResetTemplate"
import sendMail from "../middlewares/nodemailer";
import HttpErrors from "http-errors";

class AuthController {
    static Login = async (req, res) => {
        try {
            const user = await Users.findOne({where: {email: req.body.email}});
            if (!user) return res.status(404).json({msg: "User not found."});

            const match = await argon2.verify(user.password, req.body.password);
            if (!match) return res.status(400).json({msg: "Wrong password."});

            const {JWT_SECRET} = process.env;
            const uuid = user.uuid;
            const email = user.email;
            const role = user.role;
            const name = user.firstName;
            const lastName = user.lastName;
            const verified = user.verified;
            const token = jwt.sign({user_id: uuid, role}, JWT_SECRET, {});

            res.status(200).json({uuid, name, lastName, email, role, token});
        } catch (error) {
            res.status(500).json({msg: "An error occurred while logging in.", error: error.message});
        }
    }

    static  resetPasswordRequest = async (req, res, next) => {
        try {
            const {email} = req.body;
            const {JWT_SECRET} = process.env;
            const token = jwt.sign({email: email}, JWT_SECRET, {expiresIn: '10m'})
            const user = await Users.findOne({
                where: {
                    email: email
                }
            })
            const update = await Users.update({
                    accessToken: token
                },
                {
                    where: {
                        email: email
                    }
                });
            sendMail(email, HTML_TEMPLATE_PASSWORD(token))
            res.status(200).json({msg: "Verifaction link was sent to your email."})
        } catch (e) {
            res.status(200).json({msg: "Something wrong"})
        }
    }

    static resetPassword = async (req, res, next) => {
        const {JWT_SECRET} = process.env;
        const {token} = req.params;
        console.log(token)
        try {
            const {password} = req.body;
            const {confPassword} = req.body;
            console.log(password)
            console.log(token)
            const user = await Users.findOne({
                where: {
                    accessToken: token
                }
            });
            if (password !== confPassword) {
                res.status(206).json({msg: "Password and confirmation password are not the same!"})
            }
            const hashPassword = await argon2.hash(password)
            console.log(hashPassword)
            if (!user) {
                res.status(404).json({msg: "No such user"})
            }
            if (user) {
                const user = await Users.update({
                    password: hashPassword,
                }, {
                    where: {
                        accessToken: token
                    }
                })
                res.status(200).json({msg: "Password has been changed succesfully."})
            }
            ;
        } catch (e) {
            throw HttpErrors(e);
        }
        await Users.update({
            accessToken: token,
        }, {
            where: {
                accessToken: token
            }
        })
    }

    static myAccount = async (req, res) => {
        if (!req.user_id) {
            return res.status(401).json({msg: "Please log in into your account."})
        }
        const user = await Users.findOne({
            attributes: ['uuid', 'firstName', 'lastName', 'email', 'role'],
            where: {
                uuid: req.user_id
            }
        });
        if (!user) return res.status(404).json({msg: "User not found."});
        res.status(200).json(user)
    }

    static logOut = (req, res) => {
        req.session.destroy((err) => {
            if (err) return res.status(400).json({msg: "Error while logging out."})
            res.status(200).json({msg: "You've logged out."})
        });
    }

    static verify = async (req, res) => {
        try {
            const {token} = req.params;
            const user = await Users.update({
                verified: true
            }, {
                where: {
                    accessToken: token
                }
            })
            console.log(user)
            res.status(400).json(user)
        } catch (e) {
            res.status(404, "No token provided.")
        }
    }
}

export default AuthController;
