import {Model, Sequelize} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";
import Users from "./UserModel.js";

class Wishlist extends Model {

}

Wishlist.init({
    wishlist_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    count: {
        type: DataTypes.BOOLEAN
    }
}, {
    modelName: 'wishlist',
    tableName: 'wishlist',
    sequelize
})

Wishlist.belongsTo(Users, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
})

Users.hasMany(Wishlist, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
})

export default Wishlist;