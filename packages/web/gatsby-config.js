const getEnvironmentName = () => {
    if (process.env.STAGING) {
        return 'staging';
    }
    if (process.env.PREPROD) {
        return 'preprod';
    }
    if (process.env.PROD) {
        return 'prod';
    }

    return 'local';
}

const getRunMode = () => {
    return process.env.NODE_ENV === 'production' ? 'build': 'develop';
};

const envName = getEnvironmentName();

require("dotenv").config({
    path: `env/${envName}.${getRunMode()}.env`,
});

module.exports = {
    // In development mode proxy /api to our api server. When deployed this will be like cloudfront
    proxy: [
        {
          prefix: "/api",
          url: "http://localhost:8080",
        },
    ],
    siteMetadata: {
        siteUrl: process.env.SITE_BASE_URL,
        title: process.env.GATSBY_APP_NAME,
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-sass',
            options: {
                additionalData: '@import \'mixins.scss\';',
                sassOptions: {
                    includePaths: ['src/scss/mixins'],
                },
            },
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sitemap',
        'gatsby-page-templates',
        'gatsby-source-profile',
        'gatsby-redux',
        {
            resolve: 'gatsby-theme-material-ui',
            options: {
                webFontsConfig: {
                    fonts: {
                        google: [
                            {
                                family: 'Poppins',
                                variants: [
                                    '100',
                                    '200',
                                    '300',
                                    '400',
                                    '500',
                                    '600',
                                    '700',
                                    '800',
                                    '900',
                                ],
                            },
                        ],
                    },
                },
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: process.env.GATSBY_APP_NAME,
                short_name: process.env.GATSBY_APP_NAME,
                description: 'Lario\'s monorepo',
                lang: 'en',
                display: 'standalone',
                icon: 'src/images/icons/icon.png',
                background_color: '#663399',
                theme_color: '#fff',
                cache_busting_mode: 'none',
            },
        },
        {
            resolve: 'gatsby-plugin-offline',
            options: {
                precachePages: ['/profiles/'],
                workboxConfig: {
                    globPatterns: ['**/icons/*'],
                }
            }
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: process.env.SITE_BASE_URL,
                sitemap: `${process.env.SITE_BASE_URL}/sitemap/sitemap-index.xml`,
                resolveEnv: () => envName,
                env: {
                    local: {
                        policy: [{ userAgent: '*', disallow: ['/'] }]
                    },
                    staging: {
                        policy: [{ userAgent: '*', disallow: ['/'] }]
                    },
                    preprod: {
                        policy: [{ userAgent: '*', disallow: ['/'] }]
                    },
                    prod: {
                        policy: [{ userAgent: '*', allow: '/' }]
                    }
                }
            }
        },
        {
            resolve: 'gatsby-plugin-canonical-urls',
            options: {
              siteUrl: process.env.SITE_BASE_URL,
              stripQueryString: true,
            },
        },
    ],
};
