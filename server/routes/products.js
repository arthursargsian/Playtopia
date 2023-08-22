import express from "express";
import ProductController from "../controllers/ProductController.js"
import VerifyUser from "../middlewares/VerifyUser.js";
import Authorization from "../middlewares/authorization";
import CommentariesController from "../controllers/CommentariesController";
import FavoriteGamesController from "../controllers/FavoriteGamesController.js"
import tokenVerify from "../middlewares/tokenVerify.js"
import upload from "../middlewares/upload.js";
import uploadfew from "../middlewares/uploadfew.js";
import uploadfile from "../middlewares/uploadTorrent.js";

const router = express.Router();

const bigUpload = upload.single('big_img')
const smallUpload = uploadfew.array('small_img[]', 8)

router.delete('/basket/:productId', Authorization, VerifyUser.verifyUser, ProductController.deleteFromBasket);
router.get('/basket/', Authorization, VerifyUser.verifyUser, ProductController.getBasket);
router.post('/basket/:productId', Authorization, VerifyUser.verifyUser, ProductController.addToBasket);
router.post('/wishlist/:productId', Authorization, VerifyUser.verifyUser, ProductController.addToWishlist);
router.delete('/wishlist/:productId', Authorization, VerifyUser.verifyUser, ProductController.deleteFromWishlist);
router.get('/wishlist/', Authorization, VerifyUser.verifyUser, ProductController.getWishList);
router.post('/favorite/:productId', Authorization, VerifyUser.verifyUser, FavoriteGamesController.addToFavGame);
router.delete('/favorite/:productId', Authorization, VerifyUser.verifyUser, FavoriteGamesController.deleteFromFavGames);
router.get('/favorite/', Authorization, VerifyUser.verifyUser, FavoriteGamesController.getFavGames);
router.get('/favorite-last/', Authorization, VerifyUser.verifyUser, FavoriteGamesController.getFavGamesLast);
router.post('/:id/ratings', Authorization, VerifyUser.verifyUser, ProductController.createRating);
router.get('/discover/carousel', ProductController.Carousel)
router.get('/commentaries/:productId', CommentariesController.getComments)
router.post('/commentaries/:productId/', Authorization, VerifyUser.verifyUser, CommentariesController.createComment);
router.delete('/commentaries/:productId', Authorization, VerifyUser.verifyUser, CommentariesController.deleteComments);
router.get('/commentaries', Authorization, VerifyUser.verifyUser, VerifyUser.adminOnly, CommentariesController.getAllComments);
router.get('/discover', ProductController.getProducts, ProductController.findProduct);
router.get('/categories', ProductController.getGenres);
router.patch('/update-categories', Authorization, VerifyUser.adminOnly, ProductController.updateGenre);
router.post('/delete-categories', Authorization, VerifyUser.adminOnly, ProductController.deleteGenre);
router.post('/discover', ProductController.findProduct);
router.get('/discover/:id', tokenVerify, ProductController.getProductById);
router.get('/categories/:category', ProductController.getProductByCategory);
router.post('/add-categories', Authorization, VerifyUser.adminOnly, ProductController.createGenre);
router.post('/add-product', Authorization, VerifyUser.adminOnly, ProductController.createProduct, bigUpload, smallUpload);
router.patch('/update-product/:id', Authorization, VerifyUser.verifyUser, VerifyUser.adminOnly, ProductController.updateProduct);
router.delete('/delete-product/:id', Authorization, VerifyUser.verifyUser, VerifyUser.adminOnly, ProductController.deleteProduct);
router.post('/upload', bigUpload, ProductController.uploadImage);
router.post('/uploadFew', smallUpload, ProductController.uploadImages);
router.post('/uploadfile', uploadfile.single('torrent'), ProductController.uploadFile);
export default router;
