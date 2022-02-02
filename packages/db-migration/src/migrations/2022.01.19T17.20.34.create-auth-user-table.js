const { DataTypes } = require('sequelize');
const { TABLES } = require('@lario/db-models');

const up = async ({ context: queryInterface }) => {
    await queryInterface.createTable(TABLES.ADMIN_CONSOLE_USERS, {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
};

const down = async ({ context: queryInterface }) => {
    await queryInterface.dropTable('adminConsoleUsers');
};

module.exports = { up, down };
