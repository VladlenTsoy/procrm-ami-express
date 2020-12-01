const {ami} = require('config/ami.config')
const LeadService = require('services/lead.service')

const Connect = (socket) => {
    const sip = socket.handshake.query.sip
    if (ami.connected)
        socket.emit(`ami_connect`, {status: 'success', message: 'success'})

    // Подключен
    ami.on('connected', function () {
        socket.emit(`ami_connect`, {status: 'success', message: 'success'})
    });

    ami.on('event', async function (event) {
        // Принятый звонок
        if (event.event === 'Newstate' && event.connectedlinenum === sip && event.calleridnum !== sip) {
            const lead = await LeadService.FindContactAndDial(event.calleridnum)
            socket.emit(`ami_newstate`, {
                lead,
                info: {
                    channelstate: event.channelstate,
                    calleridnum: event.calleridnum,
                    uniqueid: event.uniqueid,
                    channel: event.channel,
                },
            })
        }

        // Сбросить звонок
        if (event.event === 'Hangup' && event.channel.includes('SIP/' + sip))
            socket.emit(`ami_event_hangup`, {})
    })
}

module.exports = {Connect}