const { Router } = require('express');

const user = require('./app/models/User');

const routes = new Router();

routes.post('/users', async (req, res) => {
  const teste = await user.create(req, res);
  res.json({ teste });
});

routes.get('/users', async (req, res) => {
  const teste = await user.findAll({
    attributes: ['RowKey', 'teste', 'number'],
    top: 1,
  });
  res.json({ teste });
});

module.exports = routes;
