import _ from 'lodash';
import checkCustomer from "../middlewares/stripecustomercheck"
import Users from '../models/UserModel';
import Products from '../models/ProductModel';

import Stripe from 'stripe';
import {Basket} from "../models/index.js";

const {STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY} = process.env;
const stripe = Stripe("sk_test_51MtrFBJJKYyEd7moFBcb0fosqNYfqz3SPfvnhRNxJgXHHFQD9C2EAlfQfMOJHUElFUIewGFD3dhZmnFaLY2CWIp500xyKfIWKw")

class PaymentController {
    static getSecret = async (req, res, next) => {
        const {productId} = req.params;
        const {user_id} = req;

        const product = await Products.findOne({
            where: {
                id: productId
            }
        })
        const user = await Users.findOne({
            where: {
                uuid: user_id
            }
        })

        if (user.discount === null) {
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.ceil(product.price * 100),
                    currency: 'usd',
                    payment_method_types: ['card'],
                    description: product.name,
                    customer: user_id,
                    metadata: {
                        product_name: product.name,
                        product_desc: product.desc,
                        product_bigimg: product.big_img,
                        download_link: product.download_link
                    },
                });
                res.json({
                    status: 'ok',
                    paymentIntent
                })
            } catch (e) {
                res.status(500).json(e)
            }
        }

        if (user.discount !== null) {
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.ceil(product.price * 100),
                    currency: 'usd',
                    payment_method_types: ['card'],
                    description: product.name,
                    customer: user_id,
                    metadata: {
                        product_name: product.name,
                        product_desc: product.desc,
                        product_bigimg: product.big_img,
                        download_link: product.download_link
                    },
                    discounts: [{
                        coupon: user.discount,
                    }],
                });
                await Users.update({
                    discount: null
                }, {
                    where: {
                        uuid: user_id
                    }
                })
                res.json({
                    status: 'ok',
                    paymentIntent
                })
            } catch (e) {
                res.status(500).json(e)
            }
        }
    }

    static confirm = async (req, res, next) => {
        try {
            const {paymentIntent} = req.body;
            const charge = await stripe.paymentIntents.retrieve(paymentIntent);
            res.json({
                status: 'ok',
                charge
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static getSecretBasket = async (req, res, next) => {
        const {user_id} = req;
        console.log(user_id)
        const basket = await Basket.findAll({
            where: {
                userUuid: user_id
            },
            attributes: ['count', 'price'],
            include: [{
                model: Products,
                attributes: ["name", 'big_img', 'desc', 'price', 'rating', 'download_link'],
            }],
        });
        const download_links = basket.map(item => item.product.download_link);
        // res.status(200).json(download_links)
        const downloadLinksString = JSON.stringify(download_links);
        console.log(downloadLinksString, "helloooooooooooooooooooooooooooooooooooooooooooooooooooo")
        const allPrices = basket.map((file) => parseInt(file.price));

        function findTotalPrice(array) {
            let sum = 0;
            array.forEach(el => {
                sum += el
            });
            console.log(sum)
            return sum;
        }

        let totalPrice = findTotalPrice(allPrices);
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.ceil(totalPrice * 100),
                currency: 'usd',
                payment_method_types: ['card'],
                description: "Basket products payment",
                customer: user_id,
                metadata: {
                    download_links: downloadLinksString
                }
            });
            res.json({
                status: 'ok',
                paymentIntent
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static confirmBasket = async (req, res, next) => {
        try {
            const {paymentIntent} = req.body;
            const charge = await stripe.paymentIntents.retrieve(paymentIntent);
            res.json({
                status: 'ok',
                charge
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }
    static getClientPayments = async (req, res, next) => {
        const {user_id} = req;
        const paymentIntents = await stripe.paymentIntents.list({
            customer: user_id,
        });
        const payment_history = paymentIntents.data.map(paymentIntent => {
            const amount = paymentIntent.amount;
            const currency = paymentIntent.currency;
            const status = paymentIntent.status;
            const created = paymentIntent.created;
            const metadata = paymentIntent.metadata;
            const img = paymentIntent.metadata.product_bigimg
            const desc = paymentIntent.metadata.product_desc
            return {amount, currency, status, created, img, desc};
        });
        res.status(200).json(payment_history)
    }
}


export default PaymentController;
