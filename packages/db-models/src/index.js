const bcrypt = require('bcrypt');
const { defineProfilesModel, PROFILES_TABLE, PROFILES_SCHEMA } = require('./profiles');
const {
    defineAdminConsoleUsersModel,
    ADMIN_CONSOLE_USERS_TABLE,
    ADMIN_CONSOLE_USERS_SCHEMA,
} = require('./adminConsoleUsers');
const { defineUserModel, USERS_TABLE, USERS_SCHEMA } = require('./users');

module.exports = {
    TABLES: {
        PROFILES: PROFILES_TABLE,
        ADMIN_CONSOLE_USERS: ADMIN_CONSOLE_USERS_TABLE,
        USERS: USERS_TABLE,
    },
    SCHEMAS: {
        PROFILES: PROFILES_SCHEMA,
        ADMIN_CONSOLE_USERS: ADMIN_CONSOLE_USERS_SCHEMA,
        USERS: USERS_SCHEMA,
    },
    initModels: async ({ sequelize, envConfig }) => {
        const salt = bcrypt.genSaltSync(envConfig.HASH_SALT);
        const hashPassword = (plainPassword) => bcrypt.hashSync(plainPassword, salt);

        const modelsArr = await Promise.all([
            defineProfilesModel(sequelize),
            defineAdminConsoleUsersModel(sequelize, hashPassword),
            defineUserModel(sequelize),
        ]);
        const modelsMap = modelsArr
            .map((i) => ({ [i.name]: i }))
            .reduce((prev, curr) => ({ ...prev, ...curr }), {});
        return modelsMap;
    },
};
