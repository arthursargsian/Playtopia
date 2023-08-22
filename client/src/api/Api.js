import axios from "axios";
import Utils, {baseUrl} from "../Utils";

const api = axios.create({
    baseURL: baseUrl()
});

const token = Utils.getToken();

api.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => Promise.reject(error))

class Api {
    static signUp(payload) {
        return api.post("/auth/register", payload);
    }

    static signIn(payload) {
        return api.post("/auth/login", payload);
    }

    static addProduct(payload) {
        return api.post("/products/add-product", payload);
    }

    static uploadCover(file, name) {
        return api.post(`/products/upload`, {big_img: file, name,}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    static uploadTorrent(torrent, name) {
        return api.post(`/products/uploadfile`, {torrent, name,}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    static uploadImages(images, name) {
        return api.post(`/products/uploadFew`, {small_img: [...images], name,}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    static getProducts(page) {
        return api.get("/products/discover", {params: {page, limit: 10}});
    }

    static search(payload) {
        return api.post("/products/discover/", {name: payload.name, page: payload.page, limit: 10});
    }

    static deleteProduct(id) {
        return api.delete(`/products/delete-product/${id}`);
    }

    static single(id) {
        return api.get(`/products/discover/${id}`);
    }

    static updateProduct(producData, id) {
        return api.patch(`/products/update-product/${id}`, producData);
    }

    static getCategories() {
        return api.get("/products/categories", {params: {page: 1, limit: 999}});
    }

    static addCategories(name) {
        return api.post("products/add-categories", {name,});
    }

    static deleteCategories(name) {
        return api.post("/products/delete-categories", {name,});
    }

    static getClients() {
        return api.get("/users/get-users");
    }

    static removeUsers(id) {
        return api.delete(`/users/delete-user/${id}`);
    }

    static addAdmin(payload) {
        return api.post("/auth/createAdmin", payload);
    }

    static carousel() {
        return api.get("/products/discover/carousel");
    }

    static categoriesList(payload) {
        return api.get(`products/categories/${payload.category}`, {params: {page: payload.page, limit: 10}});
    }

    static sendComment(payload) {
        return api.post(`/products/commentaries/${payload.id}`, {comment_body: payload.comment});
    }

    static getComments(payload) {
        return api.get(`/products/commentaries/${payload.id}`, {params: {page: payload.page, limit: 10}});
    }

    static addFavorite(id) {
        return api.post(`/products/favorite/${id}`);
    }

    static removeFavorite(id) {
        return api.delete(`/products/favorite/${id}`);
    }

    static getFavorite(page) {
        return api.get("/products/favorite", {params: {page, limit: 20,}});
    }

    static rating(payload) {
        return api.post(`products/${payload.id}/ratings`, {rating: payload.stars});
    }

    static getClientSecret(id) {
        return api.get(`/payment/client-secret/${id}`);
    }

    static paymentConfirm(paymentIntent) {
        return api.post("/payment/confirm/", {paymentIntent});
    }

    static addBasket(id) {
        return api.post(`/products/basket/${id}`);
    }

    static removeBasket(id) {
        return api.delete(`/products/basket/${id}`);
    }

    static getBasket(page) {
        return api.get("/products/basket", {params: {page, limit: 20}});
    }

    static basketSecret() {
        return api.get("payment/basket-secret");
    }

    static paymentConfirmBasket(paymentIntent) {
        return api.post("payment/confirm-basket", {paymentIntent});
    }

    static lastFavorites() {
        return api.get("/products/favorite-last");
    }
}

export default Api;

