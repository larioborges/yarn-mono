const { errResponse } = require('../json-schema');
const { profilesSchema, EDITABLE_FIELDS } = require('./json-schema');
const { getSqlErr, findAll } = require('../db');
const { TABLES } = require('@lario/db-models');

const PROFILES_GET_FIELDS = ['id', ...EDITABLE_FIELDS];

async function routes(fastify) {
    fastify.get(
        '',
        {
            schema: {
                response: {
                    200: {
                        type: 'array',
                        items: {
                            ...profilesSchema,
                            required: PROFILES_GET_FIELDS,
                        },
                    },
                    500: errResponse,
                },
            },
        },
        async (_, reply) => {
            try {
                const publicProfiles = await findAll(fastify, TABLES.PROFILES, {
                    attributes: PROFILES_GET_FIELDS,
                });
                reply.code(200).send(publicProfiles);
            } catch (err) {
                fastify.log.error(err);
                reply.code(500).send({ errorMsg: getSqlErr(err) });
            }
        },
    );
}

module.exports = routes;
