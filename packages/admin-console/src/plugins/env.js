const fp = require('fastify-plugin');

module.exports = fp(async (fastify, { envFilePath }, done) => {
    const envPlugin = 'fastify-env';

    fastify.logLoadStart(envPlugin);
    await fastify.register(
        require(envPlugin),
        {
            confKey: 'envConfig',
            schema: {
                type: 'object',
                required: [
                    'DOMAIN',
                    'DB_NAME',
                    'DB_USERNAME',
                    'DB_PASSWORD',
                    'DB_HOST',
                    'DB_PORT',
                    'SESSION_SECRET',
                ],
                properties: {
                    DOMAIN: {
                        type: 'string',
                    },
                    DB_NAME: {
                        type: 'string',
                    },
                    DB_USERNAME: {
                        type: 'string',
                    },
                    DB_PASSWORD: {
                        type: 'string',
                    },
                    DB_HOST: {
                        type: 'string',
                    },
                    DB_PORT: {
                        type: 'integer',
                    },
                    SESSION_SECRET: {
                        type: 'string',
                    },
                    SESSION_TTL: {
                        type: 'integer',
                        default: 1200000,
                    },
                    HASH_SALT: {
                        type: 'integer',
                        default: 15,
                    },
                },
            },
            dotenv: {
                path: envFilePath,
                debug: true,
            },
        },
        fastify.logLoadStatus(envPlugin),
    );

    done();
});
