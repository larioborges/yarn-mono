module.exports = function (fastify) {
    return (plugin) => {
        fastify.log.info(`LOADING PLUGIN: ${plugin}`);
    };
};
