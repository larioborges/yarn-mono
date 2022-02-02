const profiles = require('./profiles');
const adminConsoleUsers = require('./adminConsoleUsers');

module.exports = (modelsMap) => [profiles(modelsMap), adminConsoleUsers(modelsMap)];
