import {Model, Sequelize} from "sequelize";
import {DataTypes} from "sequelize";
import sequelize from "../services/sequelize.js";

class Users extends Model {

}

Users.init({
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    accessToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    exp: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0
    },
    level: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 1
    },
}, {
    modelName: 'users',
    tableName: 'users',
    sequelize
});

export default Users;


// add gender
// add birth date