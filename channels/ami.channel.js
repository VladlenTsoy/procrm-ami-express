const AMIService = require('services/ami.service')

const Dial = (socket) => {
    socket.on('ami_dial_preparation', async (data) => {
        const lead = await AMIService.FindContactAndDial(data.tel)
        const infoCall = await AMIService.SendCall(lead.tel)

        const response = {
            lead,
            info: {
                reason: infoCall.reason,
                channel: infoCall.channel,
                uniqueid: infoCall.uniqueid
            }
        }

        socket.emit('ami_dial_contact', response)
    })
}

const Hangup = (socket) => {
    socket.on('ami_hangup', async (data) => {
        const infoHangup = await AMIService.Hangup(data.channel)
        console.log(infoHangup)
    })
}

module.exports = {Dial, Hangup}