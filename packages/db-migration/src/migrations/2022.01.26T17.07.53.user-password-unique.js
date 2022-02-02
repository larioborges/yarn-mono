const { DataTypes } = require('sequelize');

const up = async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('users', 'email', {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    });
};

const down = async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('users', 'email', {
        type: DataTypes.STRING,
        allowNull: false,
    });
};

module.exports = { up, down };
