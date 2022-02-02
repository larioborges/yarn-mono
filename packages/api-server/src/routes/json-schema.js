const errResponse = {
    type: 'object',
    required: ['errorMsg'],
    properties: {
        errorMsg: { type: 'string' },
    },
};

const AUTO_MANAGED_FIELDS = ['id', 'createdAt', 'updatedAt'];

module.exports = {
    errResponse,
    AUTO_MANAGED_FIELDS,
};
