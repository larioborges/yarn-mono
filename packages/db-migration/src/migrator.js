const { initUmzug } = require('./setup');

const umzug = initUmzug('migrations', 'migration_meta', 'migrator');

module.exports = {
    umzug,
};

if (require.main === module) {
    umzug.runAsCLI();
}
