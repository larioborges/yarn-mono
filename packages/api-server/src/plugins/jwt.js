const fp = require('fastify-plugin');

module.exports = fp((fastify, _, done) => {
    const jwtPlugin = 'fastify-jwt';

    fastify.logLoadStart(jwtPlugin);
    fastify.register(
        require(jwtPlugin),
        {
            secret: fastify.envConfig.JWT_SECRET,
        },
        fastify.logLoadStatus(jwtPlugin),
    );

    done();
});
