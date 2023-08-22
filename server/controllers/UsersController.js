import Users from "../models/UserModel.js";
import argon2 from "argon2";
import JWT from "jsonwebtoken";
import Joi from "joi";
import HTML_TEMPLATE from "../htmltemp/mailTemplate";
import Products from "../models/ProductModel.js";
import sendMail from "../middlewares/nodemailer";
import Stripe from 'stripe';

const {STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY} = process.env;
const stripe = Stripe(STRIPE_SECRET_KEY)
import createClient from "../middlewares/createclient.js";


class UsersController {
    static getUsers = async (req, res) => {
        try {
            const response = await Users.findAll({
                attributes: ["uuid", 'firstName', 'lastName', 'email', 'role']
            });
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({msg: `Error occurred! Here: ${e.message}`})
        }
    }

    static getUserById = async (req, res) => {
        try {
            const response = await Users.findOne({
                attributes: ['uuid', 'email', 'role'],
                where: {
                    uuid: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({msg: `Error occurred! Here: ${e.message}`})
        }
    }
    static createUser = async (req, res) => {
        const {JWT_SECRET} = process.env;
        const {firstName, lastName, email, password, confPassword} = req.body
        if (password !== confPassword) return res.status(400).json({msg: "Password and confirmation password are not the same."})
        const hashPassword = await argon2.hash(password);
        try {
            await Users.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
                role: "user",
                verified: 1,
            });
            const users = await Users.findOne({
                where: {
                    email: email
                }
            })
            res.status(201).json({msg: "Register was successful."})
        } catch (e) {
            res.status(400).json({msg: `Error occurred! Here: ${e.message}`})

        }
        const user = await Users.findOne({
            where: {
                email: email
            }
        });
        const token = JWT.sign({user_id: user.uuid}, JWT_SECRET)
        sendMail(email, HTML_TEMPLATE(token))
        await Users.update({
                accessToken: token
            },
            {
                where: {
                    email: req.body.email
                }
            })
    }

    static createAdmin = async (req, res) => {
        const {firstName, lastName, email, password, confPassword} = req.body;
        if (password !== confPassword) return res.status(400).json({msg: "Password and confirmation password are not the same."})
        const hashPassword = await argon2.hash(password);

        try {
            await Users.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
                role: 'admin'
            });
            const users = await Users.findOne({
                where: {
                    email: email
                }
            })
            console.log(await createClient(firstName, lastName, email, users.uuid), "||||||||||||||||||||||||||");
            res.status(201).json({msg: "Register was successful."})
        } catch (e) {
            res.status(400).json({msg: `Error occurred! Here: ${e.message}`})

        }
    }


    static updateUser = async (req, res) => {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!user) return res.status(404).json({msg: "User not found."})
        const {firstName, lastName, password, confPassword} = req.body;

        if (!password || !confPassword) {
            res.status(404).json({msg: "Write something."})
        }
        let hashPassword;
        if (password === "" || password === null) {
            hashPassword = user.password;
        } else {
            hashPassword = await argon2.hash(password);
        }
        if (password !== confPassword) return res.status(400).json({msg: "Password and conf.password is not same."})
        if (password === confPassword) {
            try {
                await Users.update({
                    fistName: firstName,
                    lastName: lastName,
                    password: hashPassword,
                }, {
                    where: {
                        id: user.id
                    }
                });
                res.status(200).json({msg: "Password change was successful."})
            } catch (e) {
                res.status(400).json({msg: `Error occurred! Here: ${e.message}`})

            }
        }
    }

    static updatePassword = async (req, res) => {
        const {oldPassword, newPassword, confPassword} = req.body;

        const user = await Users.findOne({
            where: {
                uuid: req.user_id
            }
        });
        if (!user) return res.status(404).json({msg: "User not found."})
        if (oldPassword === "" || oldPassword === null) {
            let hashPassword = user.password;
        }
        if (oldPassword === newPassword) {
            return res.status(500).json({msg: "Generate new password!"})
        }

        if (newPassword !== confPassword) return res.status(400).json({msg: "Password and conf.password is not same."})
        if (newPassword !== confPassword) return res.status(400).json({msg: "Password and confirmation password are not the same."})
        if (newPassword.length < 8) {
            return res.status(500).json({msg: "Your password must be at least 8 characters"})
        }
        if (newPassword.search(/[a-z]/i) < 0) {
            return res.status(500).json({msg: "Your password must contain at least one letter."})

        }
        if (newPassword.search(/[0-9]/) < 0) {
            return res.status(500).json({msg: "Your password must contain at least one digit."})
        }
        let hashPassword;
        hashPassword = await argon2.hash(newPassword);
        try {
            await Users.update({
                password: hashPassword,
            }, {
                where: {
                    uuid: req.user_id
                }
            });
            res.status(200).json({msg: "Password change was successful."})
        } catch (e) {
            res.status(400).json({msg: `Error occurred! Here: ${e.message}`})

        }
    }

    static deleteUser = async (req, res) => {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!user) return res.status(404).json({msg: "User not found."})
        try {
            await Users.destroy({
                where: {
                    uuid: user.uuid
                }
            });
            res.status(200).json({msg: "User was successfully deleted."})
        } catch (e) {
            res.status(400).json({msg: `Error occurred! Here: ${e.message}`})

        }
    }
}

export default UsersController
