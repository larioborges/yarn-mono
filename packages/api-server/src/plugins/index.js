const fp = require('fastify-plugin');

module.exports = fp(function (fastify, opts, done) {
    fastify
        .register(require('./cors'))
        .register(require('./templates'))
        .register(require('./env'), opts)
        .after(() => {
            fastify
                .register(require('./bcrypt'))
                .register(require('./jwt'))
                .register(require('./sequelize'))
                .after(() => {
                    fastify.register(require('./routes'))
                });
        })
    done();
});
