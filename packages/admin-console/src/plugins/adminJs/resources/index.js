const charities = require('./charities');
const adminConsoleUsers = require('./adminConsoleUsers');

module.exports = (modelsMap) => [charities(modelsMap), adminConsoleUsers(modelsMap)];
