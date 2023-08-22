import {Model, Sequelize} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";


class Companies extends Model {

}

Companies.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        notEmpty: true
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true
    }
}, {
    modelName: "companies",
    tableName: "companies",
    sequelize
})

export default Companies