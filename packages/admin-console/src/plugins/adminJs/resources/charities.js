module.exports = (modelsMap) => ({
    resource: modelsMap.charities,
    options: {
        properties: {
            about: { type: 'richtext' },
        },
    },
});
