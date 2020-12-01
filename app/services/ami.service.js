const {ami} = require('config/ami.config')
const AmiIo = require("ami-io");

const SendCall = async (phonenumber, sip) => {
    const tel = phonenumber.length > 9 ? phonenumber.substr(phonenumber.length - 9) : phonenumber

    return new Promise((resolve) => {
        const action = new AmiIo.Action.Originate();
        action.ActionID = 555;
        action.Channel = 'SIP/' + sip;
        action.Exten = tel;
        action.Context = 'sip-locals-callPermissions';
        action.Priority = 1;
        action.CallerID = sip;
        action.Async = true;
        action.WaitEvent = true;
        action.Variable = 'ktsCallId=' + sip
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
        action.Case = 16;

        ami.send(action, function (err, data) {
            if (err)
                resolve(err)
            else
                resolve(data)
        });
    });
}

module.exports = {SendCall, Hangup}