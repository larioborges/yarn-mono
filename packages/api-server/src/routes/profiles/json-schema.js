const profilesSchema = {
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

const EDITABLE_FIELDS = ['slug', 'title', 'name', 'about'];

const EDITABLE_FIELDS_ONE_OF = EDITABLE_FIELDS.map((f) => ({ required: [f] }));

module.exports = {
    profilesSchema,
    EDITABLE_FIELDS,
    EDITABLE_FIELDS_ONE_OF,
};
