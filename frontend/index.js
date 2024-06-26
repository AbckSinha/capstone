const fs = require('fs');
const path = require('path');
const fastify = require('fastify');
const fastifyStatic = require('fastify-static');

const Model = require('./com/model');
const routes = require('./com/routes');

global.__basedir = __dirname;

const app = fastify({ logger: false });

class Application {
  constructor() {
    this.startServer = this.startServer.bind(this);
    this.stopServer = this.stopServer.bind(this);

    this.initialize();
  }

  stopServer() {
    console.log('Server stopped!');
    process.exit(1);
  }

  startServer() {
    app.register(fastifyStatic, {
      root: path.join(__dirname, 'htdocs'),
      prefix: '/',
    });

    app.register(routes);

    app.listen(Model.config.port, Model.config.host, (err, address) => {
      if (err) {
        console.log(err);
        this.stopServer();
      }
      console.log(`Server listening on ${address}`);
    });
  }

  loadConfig() {
    fs.readFile('./config/dev-config.json', 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      } else {
        Model.config = JSON.parse(data);
        this.startServer();
      }
    });
  }

  initialize() {
    process.on('SIGINT', this.stopServer);
    process.on('SIGTERM', this.stopServer);
    process.on('SIGQUIT', this.stopServer);
    this.loadConfig();
  }
}

var application = new Application();
