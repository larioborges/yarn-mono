module.exports = function (fastify) {
    fastify.decorate('logLoadStatus', require('./logLoadStatus')(fastify));
    fastify.decorate('logLoadStart', require('./logLoadStart')(fastify));
};
