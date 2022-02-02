const charitySchema = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        slug: { type: 'string' },
        title: { type: 'string' },
        name: { type: 'string' },
        about: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
    },
};

const JSON_SCHEMA_CHARITY_ID_PARAM = {
    type: 'object',
    required: ['charityId'],
    properties: {
        charityId: {
            type: 'string',
            format: 'uuid',
        },
    },
};

const EDITABLE_FIELDS = ['slug', 'title', 'name', 'about'];

const EDITABLE_FIELDS_ONE_OF = EDITABLE_FIELDS.map((f) => ({ required: [f] }));

module.exports = {
    charitySchema,
    JSON_SCHEMA_CHARITY_ID_PARAM,
    EDITABLE_FIELDS,
    EDITABLE_FIELDS_ONE_OF,
};
