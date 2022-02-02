const usersRoutes = require('./routes');

module.exports = {
    routes: usersRoutes,
    opts: { prefix: '/users' },
};
