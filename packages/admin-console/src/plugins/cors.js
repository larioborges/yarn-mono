const fp = require('fastify-plugin');

module.exports = fp((fastify, _, done) => {
    const corsPlugin = 'fastify-cors';
    fastify.logLoadStart(corsPlugin);
    fastify.register(
        require(corsPlugin),
        {
            origin: true,
            methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        },
        fastify.logLoadStatus(corsPlugin),
    );
    done();
});
