const fp = require('fastify-plugin');
const ejs = require('ejs');

module.exports = fp((fastify, _, done) => {
    const templatesPlugin = 'point-of-view';

    fastify.logLoadStart(`${templatesPlugin} emails`);
    fastify.register(
        require(templatesPlugin),
        {
            engine: {
                ejs,
            },
            propertyName: 'emails',
            layout: 'layout.ejs',
            root: './src/templates/emails',
        },
        fastify.logLoadStatus(`${templatesPlugin} emails`),
    );

    fastify.logLoadStart(`${templatesPlugin} pages`);
    fastify.register(
        require(templatesPlugin),
        {
            engine: {
                ejs,
            },
            propertyName: 'pages',
            layout: 'layout.ejs',
            root: './src/templates/pages',
        },
        fastify.logLoadStatus(`${templatesPlugin} pages`),
    );

    done();
});
