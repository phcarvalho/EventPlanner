const { Router } = require('express');

const user = require('./app/models/User');

const routes = new Router();

routes.get('/users', (req, res) => {
  res.json({ message: 'Hello World!' });
});

routes.post('/users', async (req, res) => {
  const teste = await user.create(req, res);
  res.json({ teste });
});

module.exports = routes;
