const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const ADMIN_CONSOLE_USERS_TABLE = 'adminConsoleUsers';

const ADMIN_CONSOLE_USERS_SCHEMA = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuidv4(),
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Must be a valid email address',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: ['admin', 'super'],
                msg: 'Must be either admin/super',
            },
        },
    },
};

const defineAdminConsoleUsersModel = async (sequelize, hashPassword) => {
    const adminConsoleUsers = await sequelize.define(
        ADMIN_CONSOLE_USERS_TABLE,
        ADMIN_CONSOLE_USERS_SCHEMA,
        {
            freezeTableName: true,
        },
    );

    const saltPasswordField = async (record) => {
        record.dataValues.password = hashPassword(record.dataValues.password);
    };

    adminConsoleUsers.beforeCreate(saltPasswordField);
    adminConsoleUsers.beforeUpdate(saltPasswordField);

    return adminConsoleUsers;
};

module.exports = {
    ADMIN_CONSOLE_USERS_TABLE,
    ADMIN_CONSOLE_USERS_SCHEMA,
    defineAdminConsoleUsersModel,
};
