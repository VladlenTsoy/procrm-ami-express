const {Lead} = require('models/Lead')

const FindContactAndDial = async (tel) => {
    if (String(tel).length >= 9) {
        const lead = await Lead.query().findOne('phonenumber', 'LIKE', `%${tel}%`)
        if (lead)
            return {
                id: lead.id,
                name: lead.name,
                phonenumber: lead.phonenumber,
                tel: tel,
            }
    }
    return {
        id: null,
        name: null,
        phonenumber: tel,
        tel: tel,
    }
}

module.exports = {FindContactAndDial}