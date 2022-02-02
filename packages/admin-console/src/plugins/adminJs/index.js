const { adminRoute } = require('adminjs-fastify');
const AdminJS = require('adminjs');
const { initModels, TABLES } = require('@lario/db-models');
const SequelizeAdapter = require('@adminjs/sequelize');
const bcrypt = require('bcrypt');
const { SODIUM_SECRETBOX } = require('@mgcrea/fastify-session-sodium-crypto');
const resources = require('./resources');
const fp = require('fastify-plugin');

module.exports = fp(async (fastify, _, done) => {
    fastify.logLoadStart('AdminJS');

    try {
        const modelsMap = await initModels(fastify);

        AdminJS.registerAdapter(SequelizeAdapter);
        const adminJs = new AdminJS({
            databases: [fastify.sequelize],
            rootPath: '/console',
            logoutPath: '/console/logout',
            loginPath: '/console/login',
            resources: resources(modelsMap),
            branding: {
                companyName: 'XO Sports',
            },
        });

        fastify.register(
            adminRoute,
            {
                admin: adminJs,
                auth: {
                    authenticate: async (email, password) => {
                        const adminConsoleUser = await fastify.sequelize.models[
                            TABLES.ADMIN_CONSOLE_USERS
                        ].findOne({
                            where: { email },
                        });
                        if (
                            !adminConsoleUser ||
                            !bcrypt.compareSync(password, adminConsoleUser.password)
                        ) {
                            return null;
                        }

                        return adminConsoleUser;
                    },
                    cookiePassword: fastify.envConfig.SESSION_SECRET,
                },
                multipartOptions: {
                    attachFieldsToBody: true,
                },
                sessionOptions: {
                    secret: fastify.envConfig.SESSION_SECRET,
                    cookieName: 'xoSportsConsoleSessionId',
                    cookie: {
                        maxAge: fastify.envConfig.SESSION_TTL, // 20 mins
                        secure: 'auto',
                        domain: fastify.envConfig.DOMAIN,
                    },
                    crypto: SODIUM_SECRETBOX,
                },
            },
            fastify.logLoadStatus('AdminJS'),
        );
    } catch (err) {
        fastify.log.fatal('Error loading AdminJS');
        fastify.log.fatal(err);
    }
    done();
});
