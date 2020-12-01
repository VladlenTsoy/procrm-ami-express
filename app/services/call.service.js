const {Call} = require('models/Call')
const moment = require('moment')

const Create = async ({channel, callerId, exten, status}) => {
    try {
        await Call.query().insertAndFetch({
            channel: channel,
            caller_id: callerId,
            exten: exten,
            status: status,
            call_created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
    } catch (e) {

    }
}

const Update = async ({channel, status}) => {
    try {
        await Call.query()
            .where({channel})
            .updateAndFetch({
                status: status,
                call_end_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
    } catch (e) {

    }
}

module.exports = {Create, Update}