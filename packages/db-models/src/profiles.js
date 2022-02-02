const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const PROFILES_TABLE = 'profiles';

const PROFILES_SCHEMA = {
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

const defineProfilesModel = async (sequelize) =>
    await sequelize.define(PROFILES_TABLE, PROFILES_SCHEMA);

module.exports = {
    PROFILES_TABLE,
    PROFILES_SCHEMA,
    defineProfilesModel,
};
