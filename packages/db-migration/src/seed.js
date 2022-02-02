const { initUmzug } = require('./setup');

const umzug = initUmzug('seeders', 'seeder_meta', 'seeder', true);

module.exports = {
    umzug,
};

if (require.main === module) {
    umzug.runAsCLI();
}
