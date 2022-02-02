module.exports = {
    'extends': [
        '@lario',
        'plugin:node/recommended',
    ],
    'env': {
        'node': true,
    },
    'globals': {
        'process': true,
    },
    'rules': {
        'node/exports-style': ['error', 'module.exports']
    },
};
