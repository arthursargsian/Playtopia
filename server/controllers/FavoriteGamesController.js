import FavoriteGames from "../models/FavoriteGamesModel.js";
import Products from "../models/ProductModel.js";
import HttpErrors from "http-errors";

class FavoriteGamesController {
    static addToFavGame = async (req, res, next) => {
        const {productId} = req.params;
        const {user_id} = req
        const favGameItem = await FavoriteGames.findOne({
            where: {
                productId: productId,
                userUuid: user_id
            }
        });
        const product = await Products.findOne({
            where: {
                id: productId
            }
        })
        if (!favGameItem) {
            try {
                if (!product) {
                    throw HttpErrors(404, "No such product.")
                }
                const favGame = await FavoriteGames.create({
                    productId: productId,
                    userUuid: user_id,
                    count: 1
                })
                res.status(200).json({msg: "Product has been successfully added"});
            } catch (e) {
                res.status(404).json(e)
            }
        }
        try {
            if (favGameItem.count === false || favGameItem.count === null) {
                await FavoriteGames.update({
                    count: true
                }, {
                    where: {
                        productId: productId,
                        userUuid: user_id
                    }
                })
                res.status(200).json({msg: "Product has been successfully added"});
            }
        } catch (e) {
            next(e);
        }
        try {
            if (!favGameItem || favGameItem.count === true) {
                res.status(404).json({msg: "This game is already your favorite."})
            }
        } catch (e) {
            next(e);
        }

    }

    static getFavGamesLast = async (req, res, next) => {
        const {user_id} = req;
        const favgames = await FavoriteGames.findAll({
            order: [['createdAt', 'DESC']],
            limit: 3,
            where: {
                count: 1,
                userUuid: user_id,
            }
        });

        if (favgames.length === 0) {
            res.status(200).json({msg: "You have no favorite games!"});
            return;
        }

        const productIds = favgames.map(favgame => favgame.productId);
        const products = await Products.findAll({
            where: {
                id: productIds
            },
            attributes: ["name", 'big_img', 'desc', 'price', 'rating', 'disc_price',"id"],
        });

        const result = favgames.map(favgame => {
            const product = products.find(p => p.id === favgame.productId);
            return {
                ...favgame.toJSON(),
                product
            };
        });

        res.status(200).json(products);
    };

    static getFavGames = async (req, res) => {
        const {page, limit} = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const {user_id} = req
        const favgames = await FavoriteGames.findAll({
            where: {
                count: 1,
                userUuid: user_id
            },
            include: [{
                model: Products,
                attributes: ["name", 'big_img', 'desc', 'price', 'rating', 'disc_price'],
            }],
        });
        let totalPages = Math.ceil((favgames.length - 1) / limit);
        const currentPage = parseInt(page) || 1;
        const pagination = {
            data: favgames.slice(startIndex, endIndex),
            totalPages: totalPages,
            currentPage: currentPage
        }
        res.status(200).json(pagination);
        if (!favgames) {
            res.status(200).json({msg: "No favorite games!"});
        }
    }


    static deleteFromFavGames = async (req, res, next) => {
        const {productId} = req.params;
        const {user_id} = req;
        const item = await FavoriteGames.findOne({
            where: {
                productId: productId,
                userUuid: user_id
            }
        });
        try {
            if (!item) return res.status(404).json({msg: "Forbidden error. NO such product."})
            else {
                await FavoriteGames.update({
                    count: false
                }, {
                    where: {
                        productId: productId,
                        userUuid: req.user_id
                    }
                });
                res.status(200).json({msg: "Product has been successfully destroyed."})
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default FavoriteGamesController;
