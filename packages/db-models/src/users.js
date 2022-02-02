const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const USERS_TABLE = 'users';

const USERS_SCHEMA = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuidv4(),
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
        validate: {
            isEmail: {
                msg: 'Must be a valid email address',
            },
        },
        unique: true,
    },
    hashedPassword: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
};

const defineUserModel = async (sequelize) => await sequelize.define(USERS_TABLE, USERS_SCHEMA);

module.exports = {
    USERS_TABLE,
    USERS_SCHEMA,
    defineUserModel,
};
