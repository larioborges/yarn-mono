const Fastify = require('fastify');
const uuid = require('uuid').v4;
const addDecorators = require('./decorators/addDecorators');
const addHooks = require('./hooks/addHooks');
const registerPlugins = require('./plugins');

const developmentEnv = process.env.XO_ENV ? process.env.XO_ENV : 'local';
const rootDir = `${__dirname}/..`;

const loggerConfig = {
    redact: ['headers.authorization', 'body.emailAddress', 'body.password', 'context.schema'],
    serializers: {
        res(reply) {
            return {
                statusCode: reply.statusCode,
            };
        },
        req(request) {
            return {
                method: request.method,
                url: request.url,
                path: request.routerPath,
                parameters: request.params,
                headers: request.headers,
            };
        },
    },
    mixin: () => {
        return {
            app: 'API Server',
            env: developmentEnv,
        };
    },
};

if (developmentEnv === 'local') {
    loggerConfig.transport = {
        target: 'pino-pretty',
        options: {
            colorize: true,
            destination: 1,
        },
    };
} else {
    loggerConfig.file = `${rootDir}/logs/api-server.log`;
}

const envFilePath = `${rootDir}/env/${developmentEnv}.env`;

const main = async () => {
    const fastify = Fastify({
        genReqId() {
            return uuid();
        },
        logger: loggerConfig,
    });
    
    addDecorators(fastify);
    addHooks(fastify);
    
    fastify.register(registerPlugins, { envFilePath });
    
    fastify.listen(8080, (err, address) => {
        if (err) {
            fastify.log.fatal(err);
            throw 'Could not start up server';
        }
        fastify.log.info(`Server listening at ${address}`);
    });    
}

try {
    main();
} catch(err) {
    console.log(err);
    process.exi(1);
};
