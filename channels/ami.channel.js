const {ami} = require('config/ami.config')
const AmiIo = require("ami-io");

const Dial = (socket) => {
    socket.on('ami_dial', (data) => {
        const action = new AmiIo.Action.Originate();
        action.ActionID = 555;
        action.Channel = 'SIP/202';
        action.Exten = data.tel;
        action.Context = 'sip-locals-callPermissions';
        action.Priority = 1;
        action.CallerID = '202';
        action.Async = true;
        action.WaitEvent = true;
        action.Variable = 'ktsCallId=202'
        action.Variable = 'ktsMyPhoneTo=903192933'

        ami.send(action, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
            }
        });
    })
}

module.exports = {Dial}