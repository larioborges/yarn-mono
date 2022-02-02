const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const fs = require('fs-extra');

const developmentEnv = process.env.XO_ENV ? process.env.XO_ENV : 'local';

require('dotenv').config({
    path: `${__dirname}/../env/${developmentEnv}.env`,
});

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
);

const templateHandler = (templateName) => (filepath) =>
    [[filepath, fs.readFileSync(`${__dirname}/templates/${templateName}.js`).toString()]];

const getScriptsDir = (scriptsBaseDir, hasDevEnvSubfolder) => {
    if (hasDevEnvSubfolder) {
        return [`${scriptsBaseDir}/${developmentEnv}/*.js`, { cwd: __dirname }];
    }
    return [`${scriptsBaseDir}/*.js`, { cwd: __dirname }];
};

const initUmzug = (scriptsBaseDir, modelName, templateName, hasDevEnvSubfolder) =>
    new Umzug({
        migrations: {
            glob: getScriptsDir(scriptsBaseDir, hasDevEnvSubfolder),
        },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({
            sequelize,
            modelName: modelName,
        }),
        logger: console,
        create: {
            template: templateHandler(templateName),
        },
    });

module.exports = {
    initUmzug,
};
