module.exports = {
    'extends': [
        'plugin:react/recommended',
        '@lario',
        'plugin:jsx-a11y/recommended'
    ],
    'plugins': [
        'react-hooks',
        'jsx-a11y'
    ],
    'env': {
        'browser': true,
        'node': true,
    },
    'settings': {
        'react': {
          'version': 'detect'
        }
    },
    'rules': {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'jsx-a11y/alt-text': 'warn',
        'jsx-a11y/aria-role': 'warn',
        'jsx-a11y/img-redundant-alt': [ 2, {
            'components': [ 'Pic' ],
            'words': [ 'Picture', 'Pic', 'Photograph' ]
        }],
        // a button element’s text
        // using an aria-label attribute
        // and an alt attribute in an img tag
        'jsx-a11y/control-has-associated-label': [ 2, {
            // The below is how to exclude an element
            // 'controlComponents': ['CustomButton'],
            'ignoreElements': [
                'audio',
                'canvas',
                'embed',
                'input',
                'textarea',
                'tr',
                'video',
            ],
            'labelAttributes': ['text']
        }],
        // Elements with onClick which aren't buttons need role='button'
        'jsx-a11y/no-static-element-interactions': [
            'error',
            {
              'handlers': [
                'onClick'
              ]
            }
        ],
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                'components': ['Link'],
                'specialLink': ['hrefDefault', 'to'],
                'aspects': ['noHref']
            }
        ],
        'jsx-a11y/label-has-associated-control': [ 2, {
            'labelComponents': ['Label'],
            'labelAttributes': ['label'],
            'controlComponents': ['Input'],
            'depth': 3
        }]
    },
    // ignorePatterns: ['public/*'],
};
