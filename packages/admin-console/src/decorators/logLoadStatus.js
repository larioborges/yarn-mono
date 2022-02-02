module.exports = function (fastify) {
    return (subject) => {
        return (err) => {
            if (err) {
                fastify.log.fatal(`FAILED TO LOAD: ${subject}`)
                fastify.log.fatal(err);
                throw err;
            };
            fastify.log.info(`${subject} successfully loaded`);
        };
    };
};
