const charitiesRoutes = require('./routes');

module.exports = {
    routes: charitiesRoutes,
    opts: { prefix: '/charities' },
};
