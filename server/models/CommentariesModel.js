import {Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";
import Products from './ProductModel';
import Users from "./UserModel";


class Commentaries extends Model {

}

Commentaries.init({
   comment_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
    validate: {
        notEmpty: true
    }
},
   comment_body: {
    type: DataTypes.STRING,
    allowNull: false,
   },
}, {
    modelName: "commentaries",
    tableName: "commentaries",
    sequelize
})




export default Commentaries;
