const { DataTypes } = require('sequelize');
const { TABLES } = require('@lario/db-models');

const up = async ({ context: queryInterface }) => {
    await queryInterface.createTable(TABLES.CHARITIES, {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        about: {
            type: DataTypes.TEXT,
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
    await queryInterface.dropTable(TABLES.CHARITIES);
};

module.exports = { up, down };
