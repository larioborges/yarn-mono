module.exports = (fastify, options, done) => {
    function RateLimiterStore(options) {
        this.options = options;
        this.route = '';
    }

    RateLimiterStore.prototype.routeKey = function routeKey(route) {
        if (route) this.route = route;
        return route;
    };

    RateLimiterStore.prototype.incr = async function incr(key, done) {
        const now = new Date().getTime();
        const ttl = now + this.options.timeWindow;
        const where = { route: this.route, source: key };

        const rateLimit = await fastify.sequelize.models[TABLES.ADMIN_CONSOLE_RATE_LIMITS].findOne({
            where,
        });

        if (rateLimit && parseInt(rateLimit.ttl, 10) > now) {
            try {
                await fastify.sequelize.models[TABLES.ADMIN_CONSOLE_RATE_LIMITS].update(
                    { count: rateLimit.count + 1 },
                    where,
                );
                done(null, {
                    current: rateLimit.Count + 1,
                    ttl: rateLimit.ttl,
                });
            } catch (err) {
                done(err, {
                    current: 0,
                });
            }
        } else {
            try {
                await fastify.sequelize.models[TABLES.ADMIN_CONSOLE_RATE_LIMITS].upsert({
                    route: this.route,
                    source: key,
                    count: 1,
                    ttl: ttl,
                });
                done(null, {
                    current: 1,
                    ttl: (rateLimit && rateLimit.ttl) || ttl,
                });
            } catch (err) {
                fastify.log.err(err);
                done(err, {
                    current: 0,
                });
            }
        }
    };

    RateLimiterStore.prototype.child = function child(routeOptions = {}) {
        const options = Object.assign(this.options, routeOptions);
        const store = new RateLimiterStore(options);
        store.routeKey(routeOptions.routeInfo.method + routeOptions.routeInfo.url);
        return store;
    };

    const rateLimitPlugin = 'fastify-rate-limit';
    fastify.logLoadStart(rateLimitPlugin);
    fastify.register(
        require(rateLimitPlugin),
        {
            global: true,
            max: 2,
            timeWindow: 5000,
            store: RateLimiterStore,
            skipOnError: false,
        },
        fastify.logLoadStatus(rateLimitPlugin),
    );

    done();
};
