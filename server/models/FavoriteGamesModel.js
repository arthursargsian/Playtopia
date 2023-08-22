import {Model, Sequelize} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";
import Users from "./UserModel.js";

class FavoriteGames extends Model {

}

FavoriteGames.init({
    favgame_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    count: {
        type: DataTypes.BOOLEAN
    }
}, {
    modelName: 'favorite',
    tableName: 'favorite',
    sequelize
})

FavoriteGames.belongsTo(Users, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
})

Users.hasMany(FavoriteGames, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
})

export default FavoriteGames;