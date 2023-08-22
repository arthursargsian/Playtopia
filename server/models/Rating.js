import {Model, Sequelize} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";

class Rating extends Model {

}

Rating.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    modelName: "rating",
    tableName: "rating",
    sequelize
});



export default Rating;