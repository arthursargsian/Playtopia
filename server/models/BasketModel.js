import {Model, Sequelize} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";
import Users from "./UserModel.js";

class Basket extends Model {

}

Basket.init({
    basket_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    count: {
        type: DataTypes.BOOLEAN,
    },
    price: {
        type: DataTypes.DECIMAL
    }
}, {
    modelName: 'basket',
    tableName: 'basket',
    sequelize
})

Basket.belongsTo(Users, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
})

Users.hasMany(Basket, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
})

export default Basket;