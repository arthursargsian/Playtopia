import Products from "../models/ProductModel.js";
import Genres from "../models/GenresModel";
import HttpErrors from "http-errors";
import {Op} from "sequelize";
import Commentaries from "../models/CommentariesModel.js";
import {Basket, FavoriteGames, Rating, Wishlist} from "../models/index.js";
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import fs from "fs";
import stripe from "stripe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stripe0 = stripe('sk_test_51McphtD9ZWUwhOMn77jda4ki3bLKXhte2vTVkZcfOfOTKITrhcefocEMfDNmIo3FQPZTVyxaOxViAD5bs1S5Owlu00mkB7dN9z');

class ProductController {
    static addToBasket = async (req, res, next) => {
        try {
            const {productId} = req.params;
            const {user_id} = req;
            const basketItem = await Basket.findOne({
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
            if (!product) {
                throw HttpErrors(404, "No such product.")
            }
            if (!basketItem) {
                const basket = await Basket.create({
                    productId: productId,
                    userUuid: user_id,
                    count: 1,
                    price: product.price
                })
                // const product = await Products.findOne({
                //     where: {
                //         id: productId}
                // })
                // if(product.disc_price) {
                //     const basket = await Basket.create({
                //         userUuid: user_id,
                //         productId: productId,
                //         price: product.disc_price
                //     })
                // }
                res.status(200).json({msg: "Product has been successfully added"});
            }
            if (basketItem) {
                const basket = await Basket.update({
                        count: 1,
                        price: product.price
                    },
                    {
                        where: {
                            userUuid: user_id
                        }
                    })
                res.status(200).json({msg: "Product added."});
            }
            if (basketItem.count === 0) {
                res.status(204).json({
                    msg: "Product is already in your basket."
                })
            }
        } catch (e) {
            next(e);
        }
    }

    static getBasket = async (req, res, next) => {
        const {page, limit} = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const {user_id} = req
        const basket = await Basket.findAll({
            where: {
                userUuid: user_id,
                count: 1,
            },
            attributes: ['count', 'price'],
            include: [{
                model: Products,
                attributes: ["name", 'big_img', 'desc', 'price', 'rating', 'disc_price', 'id'],
            }],
        });

        const allPrices = basket.map((file) => {
            return parseInt(file.product.disc_price) || parseInt(file.product.price);
        })
        function findTotalPrice(array) {
            let sum = 0;
            array.forEach(el => {
                sum += el
            });
            return sum;
        }

        let totalPrice = findTotalPrice(allPrices);
        let totalPages = Math.ceil((basket.length - 1) / limit);
        const currentPage = parseInt(page) || 1;

        const pagination = {
            data: basket.slice(startIndex, endIndex),
            totalPages: totalPages,
            totalPrice: totalPrice,
            currentPage: currentPage
        }
        res.status(200).json(pagination);
        if (!basket) {
            res.status(200).json({msg: "Your wishlist is empty. Add something in it!"});
        }
    }

    static deleteFromBasket = async (req, res, next) => {
        const {productId} = req.params;
        const {user_id} = req;
        const item = await Basket.findOne({
            where: {
                productId: productId,
                userUuid: user_id
            }
        });
        const product = await Products.findOne({
            where: {
                id: productId
            }
        });
        const original_price = product.price;
        try {
            if (!item) return res.status(404).json({msg: "Forbidden error. NO such product."})
            else {
                if (item) {
                    await Basket.destroy({
                        where: {
                            productId: productId,
                            userUuid: req.user_id
                        }
                    });
                }
                res.status(200).json({msg: "Product has been successfully destroyed."})
            }
        } catch (e) {
            res.status(500).json(e.message)
        }


    }

    static uploadImage = async (req, res, next) => {
        try {
            const {name} = req.body;
            const {filename, destination} = req.file;
            console.log(filename, name);
            if (!name) {
                throw HttpErrors(401, "No product name.")
            }
            if (!filename) {
                throw HttpErrors(401, "No image file.")
            }
            const path = filename;
            await Products.update({
                big_img: path,
            }, {
                where: {
                    name: name
                }
            })
            res.send(path)
        } catch (e) {
            next(e);
        }
        next();
    }

    static uploadImages = async (req, res, next) => {
        const {name} = req.body;
        try {
            console.log(req.files)
            if (!name) {
                throw HttpErrors(401, "No product name.")
            }
            const files = req.files.map(file => ({
                name: file.filename
            }));
            if (!files) {
                throw HttpErrors(401, "No file selected.")
            }
            const exists = fs.readdirSync('public/images/small');
            const existingFile = exists.find((file) => file === req.files.filename);

            if (existingFile) {
                fs.unlinkSync(req.file.path);
                next();
            }
            await Products.update({
                small_img: files
            }, {
                where: {
                    name: name
                }
            })
            res.send(files)
        } catch (e) {
            next(e);
        }
    }

    static uploadFile = async (req, res, next) => {
        try {
            const {name} = req.body;
            const {filename, destination} = req.file;
            console.log(filename, name);
            if (!name) {
                throw HttpErrors(401, "No product name.")
            }
            if (!filename) {
                throw HttpErrors(401, "No image file.")
            }
            const path = filename;
            await Products.update({
                download_link: path,
            }, {
                where: {
                    name: name
                }
            })
            res.send(path)
        } catch (e) {
            next(e);
        }
        next();
    }

    static addToWishlist = async (req, res, next) => {
        const {productId} = req.params;
        const {user_id} = req
        const wishlistItem = await Wishlist.findOne({
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
        if (!wishlistItem) {
            try {
                if (!product) {
                    throw HttpErrors(404, "No such product.")
                }
                const wishlist = await Wishlist.create({
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
            if (wishlistItem.count === false || wishlistItem.count === null) {
                await Wishlist.update({
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
            if (!wishlistItem || wishlistItem.count === true) {
                res.status(404).json({msg: "You already got this product in your wishlist."})
            }
        } catch (e) {
            next(e);
        }

    }

    static getWishList = async (req, res, next) => {
        const {page, limit} = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const {user_id} = req
        const wishlist = await Wishlist.findAll({
            where: {
                count: 1,
                userUuid: user_id
            },
            include: [{
                model: Products,
                attributes: ["name", 'big_img', 'desc', 'price', 'rating', 'disc_price'],
            }],
        });
        let totalPages = Math.ceil((wishlist.length - 1) / limit);
        const currentPage = parseInt(page) || 1;
        const pagination = {
            data: wishlist.slice(startIndex, endIndex),
            totalPages: totalPages,
            currentPage: currentPage
        }
        res.status(200).json(pagination);
        if (!wishlist) {
            res.status(200).json({msg: "Your wishlist is empty. Add something in it!"});
        }
    }

    static deleteFromWishlist = async (req, res, next) => {
        const {productId} = req.params;
        const {user_id} = req;
        const item = await Wishlist.findOne({
            where: {
                productId: productId,
                userUuid: user_id
            }
        });
        try {
            if (!item) return res.status(404).json({msg: "Forbidden error. NO such product."})
            else {
                await Wishlist.update({
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

    static getProducts = async (req, res) => {
        const {user_id} = req;
        const {page, limit} = req.query;

        try {
            const totalProducts = await Products.count();
            const totalPages = Math.ceil(totalProducts / limit);
            const currentPage = parseInt(page) || 1;

            const products = await Products.findAll({
                include: [{
                    model: Genres,
                    attributes: ['name']
                }],
                offset: (currentPage - 1) * limit,
                limit: parseInt(limit)
            });

            const pagination = {
                data: products,
                totalPages: totalPages,
                currentPage: currentPage
            };

            res.status(200).json(pagination);
        } catch (e) {
            res.status(500).json({msg: e.message});
        }
    };

    static createRating = async (req, res, next) => {
        const existsRating = await Rating.findOne({
            where: {
                userUuid: req.user_id
            }
        })
        if (existsRating) {
            try {
                const product = await Products.findOne({where: {id: req.params.id}});
                const {rating} = req.body;
                if (!product) {
                    return res.status(404).json({msg: "No such product."});
                }
                const ratingOne = await Rating.findOne({
                    where: {
                        userUuid: req.user_id
                    }
                })

                const ratingAll = await Rating.findAll({
                    where: {
                        productId: req.params.id
                    },
                    attributes: ['rating'],
                    raw: true,
                });


                const ratingCreate = await Rating.create({
                    userUuid: req.user_id,
                    productId: product.id,
                    rating: rating
                })

                const averageRate = (numbers) => {
                    const sum = numbers.reduce((acc, number) => acc + number, 0);
                    const length = numbers.length;
                    return sum / length;
                };

                let ratingMath = ratingAll.map(x => x.rating)
                let ratingFinal = Math.floor(averageRate(ratingMath));
                await Products.update({
                        rating: ratingFinal
                    },
                    {
                        where: {
                            id: req.params.id
                        }
                    })
                res.status(201).json({msg: "All good"});
            } catch (e) {
                throw HttpErrors(e, "Something went wrong!")
            }
        }
    }

    static Carousel = async (req, res, next) => {
        try {
            const product = await Products.findAll({
                limit: 4,
                order: [['createdAt', 'DESC']],
                attributes: ["big_img", "name", "desc", 'small_img', "id", "price", "disc_price"]
            });
            res.status(200).json(product)
        } catch (e) {
            next(e)
        }
    }

    static getProductById = async (req, res) => {
        const {user_id} = req;
        try {
            const commentaries = await Commentaries.findAll({
                where: {
                    productId: req.params.id
                }
            })
            const product = await Products.findOne({
                include: [{
                    model: Genres,
                    attributes: ["name"],
                }],
                attributes: ['id', 'name', 'desc', 'year', 'price', 'disc_price', 'rating', 'small_img', 'big_img', 'processor', 'ram', 'op_system', 'videocard', 'disk_space', 'company'],
                where: {
                    id: req.params.id
                }
            });
            if (!product) {
                res.status(404).json({msg: "No product like this."})
            } else if (user_id) {
                {
                    const wishlist = await Wishlist.findOne({
                        attributes: ['count'],
                        where: {
                            productId: req.params.id,
                            userUuid: req.user_id
                        }
                    })
                    const basket = await Basket.findOne({
                        attributes: ['count'],
                        where: {
                            productId: req.params.id,
                            userUuid: req.user_id
                        }
                    })
                    const favorite = await FavoriteGames.findOne({
                        attributes: ['count'],
                        where: {
                            productId: req.params.id,
                            userUuid: req.user_id
                        }
                    })
                    const data = {
                        product,
                        commentaries: commentaries,
                        wishlist: wishlist,
                        basket: basket,
                        favorite: favorite
                    };

                    res.status(200).json(data);
                }
            }
            if (!user_id) {
                console.log(user_id)
                const data = {product, commentaries: commentaries};
                res.status(200).json(data);
            }
        } catch (e) {
            res.status(500).json({msg: `Error occurred! Here: ${e.message}`})
        }
    }

    static getProductByCategory = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const offset = (page - 1) * limit;

            const products = await Products.findAndCountAll({
                include: [{
                    model: Genres,
                    where: {name: req.params.category},
                    attributes: ['name'],
                }],
                limit,
                offset,
            });

            const totalPages = Math.ceil(products.count / limit);

            res.status(200).json({
                products: products.rows,
                page: page,
                totalPages,
                totalProducts: products.count,
                limit: limit
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }


    static createProduct = async (req, res) => {
        const {
            name,
            desc,
            price,
            year,
            disc_price,
            company,
            processor,
            ram,
            op_system,
            videocard,
            disk_space
        } = req.body;
        const {genre_name} = req.body;
        console.log(genre_name)
        const product = await Products.findOne({
            where: {
                name: name
            }
        })
        try {
            const exists = await Genres.findOne({
                where: {
                    name: genre_name
                }
            })
            if (!exists) {
                res.status(404).json("No such genre.")
            }
        } catch (e) {
            res.send(404, e)
            next();
        }
        if (!product) {
            try {
                if (disc_price) {
                    const product = await Products.create({
                        name: name,
                        desc: desc,
                        year: year,
                        price: price,
                        disc_price: disc_price,
                        company: company,
                        processor: processor,
                        ram: ram,
                        op_system: op_system,
                        videocard: videocard,
                        disk_space: disk_space
                    });
                    if (product) {
                        const genre = await Genres.findOne({
                            where: {
                                name: genre_name
                            }
                        })
                        try {
                            await product.addGenre([genre]);
                        } catch (e) {
                            res.send(e);
                        }
                        res.status(201).json({msg: "Product has been created successfully."})
                    } else {
                        res.status(404).json({msg: "Product not found."})
                    }
                } else {
                    const product = await Products.create({
                        name: name,
                        desc: desc,
                        year: year,
                        price: price,
                        company: company,
                        processor: processor,
                        ram: ram,
                        op_system: op_system,
                        videocard: videocard,
                        disk_space: disk_space
                    })
                    if (product) {
                        const genre = await Genres.findOne({
                            where: {
                                name: genre_name
                            }
                        })
                        try {
                            await product.addGenre([genre]);
                        } catch (e) {
                            res.send(e);
                        }
                        res.status(201).json({msg: "Product has been created successfully."})
                    } else {
                        res.status(404).json({msg: "Product not found."})
                    }

                }
                await product.addGenre[{genre_name}]
                res.status(201).json({msg: "Product has been created successfully."})
            } catch (e) {
                console.log(e)
            }
        }
        if (product) {
            const genre = await Genres.findOne({
                where: {
                    name: genre_name
                }
            })
            try {
                await product.addGenre([genre]);
            } catch (e) {
                res.send(e);
            }
            res.status(201).json({msg: "Product has been created successfully."})
        }
    }
    static createGenre = async (req, res) => {
        const {name} = req.body
        try {
            await Genres.create({
                name: name
            })
            res.status(201).json({msg: "Everything good! Genre created."})
        } catch (e) {
            throw HttpErrors(500, `Something went wrong: ${e} `)
        }
    }

    static updateGenre = async (req, res) => {
        const {name} = req.body
        try {
            await Genres.update({
                name: name,
            }, {
                where: {
                    name: name
                }
            });
            res.status(201).json({msg: "Everything good! Genre updated."})
        } catch (e) {
            throw HttpErrors(500, `Something went wrong: ${e} `)
        }
    }
    static deleteGenre = async (req, res) => {
        const {name} = req.body;
        try {
            await Genres.destroy({
                where: {
                    name: name
                }
            });
            res.status(201).json({msg: "Everything good! Genre deleted."})
        } catch (e) {
            throw HttpErrors(500, `Something went wrong: ${e} `)
        }
    }

    static getGenres = async (req, res) => {
        try {
            let response = await Genres.findAll();
            res.status(200).json(response);
        } catch (e) {
            throw HttpErrors(500, `Something went wrong: ${e}`)
        }
    }

    static updateProduct = async (req, res) => {
        const product = await Products.findOne({
            where: {
                id: req.params.id
            }
        });
        const {
            name,
            desc,
            price,
            year,
            disc_price,
            company,
            genre_name,
            processor,
            ram,
            op_system,
            videocard,
            disk_space
        } = req.body;
        if (!product) {
            res.status(404).json({msg: "No product like this."})
        } else {
            await Products.update({
                name: name,
                desc: desc,
                price: price,
                year: year,
                disc_price: disc_price,
                company: company,
                genre: genre_name,
                processor: processor,
                ram: ram,
                op_system: op_system,
                videocard: videocard,
                disk_space: disk_space
            }, {
                where: {
                    id: product.id
                }
            });
            res.status(200).json({msg: "Product has been updated."})
        }
    }
    static deleteProduct = async (req, res) => {
        const product = await Products.findOne({
            where: {
                id: req.params.id
            }
        });
        try {
            if (!product) return res.status(404).json({msg: "No such product"})
            else {
                await Products.destroy({
                    where:
                        {
                            id: product.id
                        }
                });
                res.status(200).json({msg: "Product has been successfully destroyed."})
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static findProduct = async (req, res, next) => {
        const {name, page, limit} = req.body;
        if (!name) {
            return res.json({msg: "Write something!"});
        }
        try {
            const offset = (page - 1) * limit;
            const products = await Products.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `${name}%`
                    },
                },
                offset,
                limit,
            });

            if (products.count === 0) {
                return res.status(404).json({msg: "No products found."});
            }

            const totalPages = Math.ceil(products.count / limit);

            res.status(200).json({
                totalPages,
                currentPage: page,
                products: products.rows,
            });
        } catch (e) {
            next(e);
        }
    }
}

export default ProductController;
