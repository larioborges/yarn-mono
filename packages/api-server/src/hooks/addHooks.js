module.exports = function (fastify) {
    fastify
        .addHook('preHandler', (req, _, done) => {
            if (req.body) {
                req.log.info({ body: req.body }, `Request ${req.id} body`);
            }
            done();
        })
        .addHook('onResponse', (req, reply, done) => {
            req.log.info(
                {
                    url: req.raw.url,
                    statusCode: reply.raw.statusCode,
                    durationMs: Date.now() - reply.startTime,
                },
                'request completed',
            );
            done();
        })
        .addHook('onRequest', (req, reply, done) => {
            reply.startTime = Date.now();
            req.log.info({ url: req.raw.url, id: req.id }, 'received request');
            done();
        })
        .addHook('onClose', (fastify, done) => {
            fastify.log.info('Server onClose hook fired');
            fastify.sequelize.close();
            done();
        });
};
