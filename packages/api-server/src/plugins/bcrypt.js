const fp = require('fastify-plugin');

module.exports = fp(function (fastify, _, done) {
    const cryptPlugin = 'fastify-bcrypt';
    fastify.logLoadStart(cryptPlugin);
    fastify.register(
        require(cryptPlugin),
        {
            saltWorkFactor: fastify.envConfig.HASH_SALT,
        },
        fastify.logLoadStatus(cryptPlugin),
    );

    done();
});
