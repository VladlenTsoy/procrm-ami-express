const knexfile = require('../knexfile');
const knex = require('knex')(knexfile['development']);
const {Model} = require('objection');
const visibilityPlugin = require('objection-visibility').default;

Model.knex(knex);

module.exports = visibilityPlugin(Model);