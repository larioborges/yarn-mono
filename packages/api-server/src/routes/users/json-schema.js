const { errResponse } = require('../json-schema');
const LOGIN_REQUIRED_FIELDS = ['emailAddress', 'password'];
const SIGNUP_REQUIRED_FIELDS = [
    'firstName',
    'lastName',
    'emailAddress',
    'password',
    'agreeToTerms',
];

const RESPONSE_SCHEMA = {
    200: {
        type: 'object',
        required: ['authToken'],
        properties: {
            authToken: { type: 'string' },
            email: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            createdAt: { type: 'string' },
        },
    },
    500: errResponse,
    401: errResponse
};

const LOGIN_REQUEST_BODY = {
    type: 'object',
    required: LOGIN_REQUIRED_FIELDS,
    properties: {
        emailAddress: { type: 'string', format: 'email' },
        password: { type: 'string' },
        recaptcha: { type: 'string' },
    },
};

const LOGIN_SCHEMA = {
    required: LOGIN_REQUIRED_FIELDS,
    body: LOGIN_REQUEST_BODY,
    response: RESPONSE_SCHEMA,
};

const SIGNUP_REQUEST_BODY = {
    type: 'object',
    required: SIGNUP_REQUIRED_FIELDS,
    properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        emailAddress: { type: 'string', format: 'email' },
        password: { type: 'string' },
        recaptcha: { type: 'string' },
        agreeToTerms: { type: 'boolean' },
    },
};

const SIGNUP_SCHEMA = {
    body: SIGNUP_REQUEST_BODY,
    response: RESPONSE_SCHEMA,
};

module.exports = {
    LOGIN_SCHEMA,
    SIGNUP_SCHEMA,
};
