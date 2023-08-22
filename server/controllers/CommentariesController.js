import Commentaries from "../models/CommentariesModel.js";
import HttpErrors from "http-errors"
import Users from "../models/UserModel.js";
import Products from "../models/ProductModel.js";

class CommentariesController {

    static deleteComments = async (req, res, next) => {
        try {
            const {productId} = req.params;
            const {user_id} = req;
            const exists = await Commentaries.findOne({
                where: {
                    productId: productId,
                    userUuid: user_id
                }
            })

            if (!exists) {
                throw HttpErrors(404, "No such comment.")
            }
            if (exists) {
                await Commentaries.destroy({
                    where: {
                        productId: productId,
                        userUuid: user_id
                    }
                })
                res.status(200).json({msg: "Comment has been destroyed"})
            }
        } catch (e) {
            next(e);
        }
    }

    static createComment = async (req, res, next) => {
        try {

            const {comment_body} = req.body;
            const {productId} = req.params;
            const {user_id} = req
            const user = await Users.findByPk(user_id);
            const product = await Products.findByPk(productId);
            if (!user) {
                throw HttpErrors(404, "No such user.")
            }
            if (!product) {
                throw HttpErrors(404, "No such product.")
            }

            const comment = await Commentaries.create({
                comment_body: comment_body,
                userUuid: user_id,
                productId: productId
            })
            res.status(200).json(comment)
        } catch (e) {
            throw HttpErrors(401, e)
        }
    }

    // static getComments = async (req, res, next) => {
    //     const response = await Commentaries.findAll({
    //       where: {
    //         productId: req.params.productId
    //       },
    //       include: Users, Products
    //     }).then((comments) => {
    //       return comments.map((comment) => {
    //         return { id: comment.comment_id, message: comment.comment_body, firstName: comment.user.firstName, lastName: comment.user.lastName, productId: comment.productId};
    //       });
    //     });
    //     res.status(200).json(response)
    //   };

    static getComments = async (req, res, next) => {
        const defaultPageSize = 10;
        const maxPageSize = 50;

        const currentPage = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || defaultPageSize;

        const effectivePageSize = Math.min(pageSize, maxPageSize);

        const offset = (currentPage - 1) * effectivePageSize;

        try {
            const comments = await Commentaries.findAndCountAll({
                where: {
                    productId: req.params.productId
                },
                include: [Users, Products],
                offset,
                limit: effectivePageSize
            });

            const response = {
                totalCount: comments.count,
                totalPages: Math.ceil(comments.count / effectivePageSize),
                currentPage: currentPage,
                pageSize: effectivePageSize,
                comments: comments.rows.map((comment) => {
                    return {
                        id: comment.comment_id,
                        message: comment.comment_body,
                        firstName: comment.user.firstName,
                        lastName: comment.user.lastName,
                        productId: comment.productId,
                        createdAt: comment.createdAt
                    };
                })
            };
            res.status(200).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal server error'});
        }
    };


    static getAllComments = async (req, res, next) => {
        const response = await Commentaries.findAll({
            include: Users, Products
        }).then((comments) => {
            return comments.map((comment) => {
                return {
                    id: comment.comment_id,
                    message: comment.comment_body,
                    firstName: comment.user.firstName,
                    lastName: comment.user.lastName,
                    productId: comment.productId
                };
            })
        })
        res.status(200).json(response);
    }
}


export default CommentariesController;
