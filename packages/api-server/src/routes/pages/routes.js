async function routes(fastify) {
    fastify.get(
        '/unsupported-browser',
        {},
        async (_, reply) => {
            reply.pages('unsupportedBrowser.ejs');
        },
    );
}

module.exports = routes;
