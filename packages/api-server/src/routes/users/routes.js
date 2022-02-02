const { create, queryByProperty } = require('../db');
const { TABLES } = require('@lario/db-models');
const { LOGIN_SCHEMA, SIGNUP_SCHEMA } = require('./json-schema');

async function routes(fastify) {
    fastify.post(
        '/login',
        {
            schema: LOGIN_SCHEMA,
        },
        async (request, reply) => {
            try {
                const user = await queryByProperty(fastify, TABLES.USERS, {
                    email: request.body.emailAddress,
                });

                if (!user) {
                    reply.code(401).send({ errorMsg: 'Email or password is incorrect!' });
                    return;
                }
                const isMatch = await fastify.bcrypt.compare(
                    request.body.password,
                    user.hashedPassword,
                );

                if (!isMatch) {
                    reply.code(401).send({ errorMsg: 'Email or password is incorrect!' });
                    return;
                }

                reply.code(200).send({ authToken: 'i_am_an_auth_token' });

            } catch (e) {
                reply.code(500).send({ errorMsg: e });
            }
        },
    );

    fastify.post(
        '/signup',
        {
            schema: SIGNUP_SCHEMA,
        },
        async (request, reply) => {
            const user = await queryByProperty(fastify, TABLES.USERS, {
                email: request.body.emailAddress,
            });
            if (user) {
                reply.code(500).send({ errorMsg: 'User email already exists!' });
                return;
            }

            try {
                const hashedPassword = await fastify.bcrypt.hash(request.body.password);
                const token = fastify.jwt.sign({  });

                await create(fastify, TABLES.USERS, {
                    email: request.body.emailAddress,
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    hashedPassword,
                });

                reply.code(200).send({
                    authToken: token,
                });
            } catch (e) {
                reply.code(500).send({ errorMsg: e });
                fastify.log.fatal("Signup failed");
                throw e;
            }
        },
    );
}

module.exports = routes;
