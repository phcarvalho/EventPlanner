const express = require('express');

const routes = require('./routes');

require('./database');

class App {
  constructor() {
    this.init();

    this.middlewares();
    this.routes();
  }

  init() {
    this.server = express();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
