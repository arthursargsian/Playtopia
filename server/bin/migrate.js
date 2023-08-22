import {
    ProductModel,
    UserModel,
    GenreModel,
    CompaniesModel,
    CommentariesModel,
    ProductCategories,
    Rating,
    Wishlist,
    Basket,
    FavoriteGames
} from "../models";

async function main() {
    for (let model of [ProductModel, UserModel, GenreModel, CompaniesModel, CommentariesModel, ProductCategories, Rating, Wishlist, Basket, FavoriteGames]) {
        await model.sync({alter: true})
    }
    process.exit(0);
}

main();
