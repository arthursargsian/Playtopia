import {Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";


class Genres extends Model {

}

Genres.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    modelName: "genres",
    tableName: "genres",
    sequelize
})


export default Genres;