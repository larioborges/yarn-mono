module.exports = (modelsMap) => ({
    resource: modelsMap.adminConsoleUsers,
    options: {
        properties: {
            encryptedPassword: {
                isVisible: false,
            },
            password: {
                type: 'string',
                isVisible: {
                    list: false,
                    edit: true,
                    filter: false,
                    show: false,
                },
            },
            role: {
                availableValues: [
                    { value: 'admin', label: 'Admin' },
                    { value: 'super', label: 'Super' },
                ],
            },
        },
    },
});
