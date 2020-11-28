const Model = require('../../config/knex.config');

class Lead extends Model {
    static tableName = process.env.DB_PREFIX + 'leads'
}

module.exports = {Lead}