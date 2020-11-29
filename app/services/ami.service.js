const {ami} = require('config/ami.config')
const AmiIo = require("ami-io");
const {Lead} = require('models/Lead')

const FindContactAndDial = async (tel) => {
    if (String(tel).length >= 9) {
        const lead = await Lead.query().findOne('phonenumber', 'LIKE', `%${tel}%`)
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

const SendCall = async (phonenumber) => {
    const tel = phonenumber.length > 9 ? phonenumber.substr(phonenumber.length - 9) : phonenumber

    console.log(tel)
    return new Promise((resolve) => {
        const action = new AmiIo.Action.Originate();
        action.ActionID = 555;
        action.Channel = 'SIP/202';
        action.Exten = tel;
        action.Context = 'sip-locals-callPermissions';
        action.Priority = 1;
        action.CallerID = '202';
        action.Async = true;
        action.WaitEvent = true;
        action.Variable = 'ktsCallId=202'
        action.Variable = 'ktsMyPhoneTo=' + tel

        ami.send(action, function (err, data) {
            if (err)
                resolve(err)
            else
                resolve(data)
        });
    });
}

const Hangup = async (channel) => {
    return new Promise((resolve) => {
        const action = new AmiIo.Action.Hangup();
        action.ActionID = 556;
        action.Channel = channel;

        ami.send(action, function (err, data) {
            if (err)
                resolve(err)
            else
                resolve(data)
        });
    });
}

module.exports = {FindContactAndDial, SendCall, Hangup}