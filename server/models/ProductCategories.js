import {Model, Sequelize} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";

class ProductCategory extends Model {

}


ProductCategory.init({},{
    modelName: "productcategory_id",
    tableName: "productcategory_id",
    sequelize
})

export default ProductCategory;