const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const CHARITIES_TABLE = 'charities';

const CHARITIES_SCHEMA = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuidv4(),
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
};

const defineCharityModel = async (sequelize) =>
    await sequelize.define(CHARITIES_TABLE, CHARITIES_SCHEMA);

module.exports = {
    CHARITIES_TABLE,
    CHARITIES_SCHEMA,
    defineCharityModel,
};
