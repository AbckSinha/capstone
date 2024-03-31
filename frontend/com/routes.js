// @file routes.js
const Controller = require('./controller');

class Routes {
    constructor() {
        this.initialize = this.initialize.bind(this);
        this.isAlive = this.isAlive.bind(this);
    }

    isAlive(request, reply) {
        return {
            message: "Welcome to DocTalker API"
        };
    }

    async initialize(fastify, options) {
        fastify.get('/live', this.isAlive);
        fastify.post('/api/send', Controller.getData);
    }
}

const routes = new Routes();

module.exports = routes.initialize;