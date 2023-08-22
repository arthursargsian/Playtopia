import {Model, Sequelize} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";
import Users from "./UserModel.js";
import Genres from "./GenresModel.js";
import ProductCategory from "./ProductCategories.js";
import Commentaries from "./CommentariesModel.js";
import Rating from "./Rating.js";
import Wishlist from "./WishlistModel.js";
import Basket from "./BasketModel.js";
import FavoriteGames from "./FavoriteGamesModel.js";

class Products extends Model {

}

Products.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unsigned: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true
    },
    disc_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    big_img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    small_img: {
        type: DataTypes.JSON,
        allowNull: true
    },
    year: {
        type: DataTypes.DATE,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    processor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ram: {
        type: DataTypes.STRING,
        allowNull: true
    },
    op_system: {
        type: DataTypes.STRING,
        allowNull: true
    },
    videocard: {
        type: DataTypes.STRING,
        allowNull: true
    },
    disk_space: {
        type: DataTypes.STRING,
        allowNull: true
    },
    download_link: {
        type: DataTypes.STRING,
        allowNull: true
    }
    
}, {
    modelName: "product",
    tableName: "product",
    sequelize
})

Products.belongsToMany(Genres, {
    through: ProductCategory,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Genres.belongsToMany(Products, {
    through: ProductCategory,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Commentaries.belongsTo(Users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Users.hasMany(Commentaries, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Commentaries.belongsTo(Products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Products.hasMany(Commentaries, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})


Rating.belongsTo(Users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Users.hasMany(Rating, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Rating.belongsTo(Products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Products.hasMany(Rating, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Products.hasMany(Wishlist, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Wishlist.belongsTo(Products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Products.hasMany(Basket, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Basket.belongsTo(Products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Products.hasMany(FavoriteGames, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

FavoriteGames.belongsTo(Products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

export default Products;