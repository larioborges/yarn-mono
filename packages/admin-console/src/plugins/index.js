const fp = require('fastify-plugin');

module.exports = fp(function (fastify, opts, done) {
    fastify
        .register(require('./cors'))
        .register(require('./env'), opts)
        .after(() => {
            fastify
                .register(require('./sequelize'))
                .after(() => {
                    fastify
                    .register(require('./adminJs'))
                    // .register(require('./rateLimit'))
                });
        });
    done();
});
