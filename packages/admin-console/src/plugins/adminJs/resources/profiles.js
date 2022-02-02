module.exports = (modelsMap) => ({
    resource: modelsMap.profiles,
    options: {
        properties: {
            about: { type: 'richtext' },
        },
    },
});
