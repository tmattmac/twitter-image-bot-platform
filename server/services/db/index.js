const knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONN_STRING,
});

module.exports = knex;
