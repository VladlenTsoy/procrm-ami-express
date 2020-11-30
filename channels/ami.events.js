const {ami} = require('config/ami.config')
const LeadService = require('services/lead.service')

const Connect = (socket) => {
    if (ami.connected)
        socket.emit(`ami_connect`, {status: 'success', message: 'success'})

    // Подключен
    ami.on('connected', function () {
        socket.emit(`ami_connect`, {status: 'success', message: 'success'})
    });

    ami.on('event', async function (event) {
        // Принятый звонок
        if (event.event === 'Newstate' && event.connectedlinenum === '202' && event.calleridnum !== '202') {
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
        if (event.event === 'Hangup' && event.channel.includes('SIP/202'))
            socket.emit(`ami_event_hangup`, {})
    })
}

module.exports = {Connect}