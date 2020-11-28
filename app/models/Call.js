const Model = require('../../config/knex.config');

class Call extends Model {
    static tableName = process.env.DB_PREFIX + 'procrm_voip_calls'
}

module.exports = {Call}