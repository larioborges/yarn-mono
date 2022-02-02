const { errResponse } = require('../json-schema');
const { charitySchema, EDITABLE_FIELDS } = require('./json-schema');
const { getSqlErr, findAll } = require('../db');
const { TABLES } = require('@lario/db-models');

const CHARITY_GET_FIELDS = ['id', ...EDITABLE_FIELDS];

async function routes(fastify) {
    fastify.get(
        '',
        {
            schema: {
                response: {
                    200: {
                        type: 'array',
                        items: {
                            ...charitySchema,
                            required: CHARITY_GET_FIELDS,
                        },
                    },
                    500: errResponse,
                },
            },
        },
        async (_, reply) => {
            try {
                const charities = await findAll(fastify, TABLES.CHARITIES, {
                    attributes: CHARITY_GET_FIELDS,
                });
                reply.code(200).send(charities);
            } catch (err) {
                fastify.log.error(err);
                reply.code(500).send({ errorMsg: getSqlErr(err) });
            }
        },
    );
}

module.exports = routes;
