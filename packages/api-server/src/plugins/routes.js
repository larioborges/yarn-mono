const fp = require('fastify-plugin');
const routes = require('../routes');

module.exports = fp(function (fastify, _, done) {
    fastify.logLoadStart('routes');
    for (const key of Object.keys(routes)) {
        const route = routes[key];
        fastify.logLoadStart(`Route: ${key}`);
        fastify.register(route.routes, route.opts, fastify.logLoadStatus(`Route: ${key}`));
    }
    fastify.logLoadStatus('routes')(false);
    done();
});
