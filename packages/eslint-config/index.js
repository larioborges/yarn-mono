module.exports = {
    'extends': [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:json/recommended'
    ],
    'plugins': [
        'json',
        'prettier',
    ],
    'settings': {
        'import/ignore': ['gatsby'],
    },
    'rules': {      
        // enable additional rules
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
  
        // override default options for rules from base configurations
        'comma-dangle': ['error', 'always-multiline'],
        'no-cond-assign': ['error', 'always'],
  
        // disable rules from base configurations
        'no-console': 'off',

        'prettier/prettier': 'error',
        'indent': ['error', 4, {'SwitchCase': 1}],
    }
};
