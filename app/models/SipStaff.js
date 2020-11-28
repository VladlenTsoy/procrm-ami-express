const Model = require('../../config/knex.config');

class SipStaff extends Model {
    static tableName = process.env.DB_PREFIX + 'procrm_voip_sip_staff'
}

module.exports = {SipStaff}