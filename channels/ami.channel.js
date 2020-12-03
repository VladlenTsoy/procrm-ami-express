const AMIService = require('services/ami.service')
const LeadService = require('services/lead.service')

const Dial = (socket) => {
    socket.on('ami_dial_preparation', async (data) => {
        const sip = socket.handshake.query.sip
        const lead = await LeadService.FindContactAndDial(data.tel)
        const infoCall = await AMIService.SendCall(lead.tel, sip)

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
        if (infoHangup.response === 'Success')
            socket.emit('ami_hangup_response')
    })
}

const CheckStatus = (socket) => {
    socket.on('ami_check_channel', async (data) => {
        const status = await AMIService.CheckStatus(data.info.channel)
        if (status.response === 'Success')
            socket.emit('ami_newstate', data)
    })
}

module.exports = {Dial, Hangup, CheckStatus}