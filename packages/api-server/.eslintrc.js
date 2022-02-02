module.exports = {
    'extends': [
        '@lario',
        'plugin:node/recommended',
    ],
    'env': {
        'node': true,
        'jest': true,
    },
    'globals': {
        'process': true,
    },
    'rules': {
        'node/exports-style': ['error', 'module.exports'],
        'node/no-unpublished-require': 'off',
    },
};
