const mysql2 = require('mysql2');
const sequelizeFastify = require('sequelize-fastify');
const fp = require('fastify-plugin');

module.exports = fp(async (fastify, _, done) => {
    const ormPlugin = 'sequelize-fastify';

    fastify.logLoadStart(ormPlugin);
    await fastify.register(
        sequelizeFastify,
        {
            instance: 'sequelize',
            sequelizeOptions: {
                dialect: 'mysql',
                dialectModule: mysql2,
                database: fastify.envConfig.DB_NAME,
                username: fastify.envConfig.DB_USERNAME,
                password: fastify.envConfig.DB_PASSWORD,
                options: {
                    host: fastify.envConfig.DB_HOST,
                    port: fastify.envConfig.DB_PORT,
                },
            },
        },
        fastify.logLoadStatus(ormPlugin),
    );

    try {
        await fastify.sequelize.authenticate();
        fastify.log.info('Successfully authenticated to DB');
    } catch (err) {
        fastify.log.fatal('Failed to authenticate DB');
        fastify.log.fatal(err);
    }

    done();
});
