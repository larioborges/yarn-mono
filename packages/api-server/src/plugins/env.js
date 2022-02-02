const fp = require('fastify-plugin');

module.exports = fp((fastify, { envFilePath }, done) => {
    const envPlugin = 'fastify-env';

    fastify.logLoadStart(envPlugin);
    fastify.register(
        require(envPlugin),
        {
            confKey: 'envConfig',
            schema: {
                type: 'object',
                required: ['DB_NAME', 'DB_USERNAME', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT', 'JWT_SECRET'],
                properties: {
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
                    HASH_SALT: {
                        type: 'integer',
                        default: 15,
                    },
                    JWT_SECRET: {
                        type: 'string'
                    }
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
