const knexfile = require('../knexfile');
const knex = require('knex')(knexfile[process.env.APP_MODE]);
const {Model} = require('objection');
const visibilityPlugin = require('objection-visibility').default;

Model.knex(knex);

module.exports = visibilityPlugin(Model);