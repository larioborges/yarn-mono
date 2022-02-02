const bcrypt = require('bcrypt');
const { defineCharityModel, CHARITIES_TABLE, CHARITIES_SCHEMA } = require('./charities');
const {
    defineAdminConsoleUsersModel,
    ADMIN_CONSOLE_USERS_TABLE,
    ADMIN_CONSOLE_USERS_SCHEMA,
} = require('./adminConsoleUsers');
// const {
//     API_RATE_LIMITS_TABLE,
//     ADMIN_CONSOLE_RATE_LIMITS_TABLE,
//     API_RATE_LIMITS_SCHEMA,
//     ADMIN_CONSOLE_RATE_LIMITS_SCHEMA,
//     defineApiRateLimitsModel,
//     defineAdminConsoleRateLimitsModel,
// } = require('./rateLimits');
const { defineUserModel, USERS_TABLE, USERS_SCHEMA } = require('./users');

module.exports = {
    TABLES: {
        CHARITIES: CHARITIES_TABLE,
        ADMIN_CONSOLE_USERS: ADMIN_CONSOLE_USERS_TABLE,
        USERS: USERS_TABLE,
        // API_RATE_LIMITS: API_RATE_LIMITS_TABLE,
        // ADMIN_CONSOLE_RATE_LIMITS: ADMIN_CONSOLE_RATE_LIMITS_TABLE,
    },
    SCHEMAS: {
        CHARITIES: CHARITIES_SCHEMA,
        ADMIN_CONSOLE_USERS: ADMIN_CONSOLE_USERS_SCHEMA,
        USERS: USERS_SCHEMA,
        // API_RATE_LIMITS: API_RATE_LIMITS_SCHEMA,
        // ADMIN_CONSOLE_RATE_LIMITS: ADMIN_CONSOLE_RATE_LIMITS_SCHEMA,
    },
    initModels: async ({ sequelize, envConfig }) => {
        const salt = bcrypt.genSaltSync(envConfig.HASH_SALT);
        const hashPassword = (plainPassword) => bcrypt.hashSync(plainPassword, salt);

        const modelsArr = await Promise.all([
            defineCharityModel(sequelize),
            defineAdminConsoleUsersModel(sequelize, hashPassword),
            defineUserModel(sequelize),
            // defineApiRateLimitsModel(sequelize),
            // defineAdminConsoleRateLimitsModel(sequelize),
        ]);
        const modelsMap = modelsArr
            .map((i) => ({ [i.name]: i }))
            .reduce((prev, curr) => ({ ...prev, ...curr }), {});
        return modelsMap;
    },
};
