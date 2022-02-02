const { DataTypes } = require('sequelize');

const up = async ({ context: queryInterface }) => {
    await queryInterface.createTable('exampleTable', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        name: {
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
    await queryInterface.dropTable('exampleTable');
};

module.exports = { up, down };
