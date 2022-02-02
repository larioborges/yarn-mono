module.exports = function (fastify) {
    return (subject) => {
        return (err) => {
            if (err) {
                fastify.log.fatal(`FAILED TO LOAD: ${subject}`);
                throw err;
            }
            fastify.log.info(`${subject} successfully loaded`);
        };
    };
};
