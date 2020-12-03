const {ami} = require('config/ami.config')
const LeadService = require('services/lead.service')

const Connect = (socket) => {
    const sip = socket.handshake.query.sip
    let currentChannel = null
    let currentExten = null

    if (ami.connected)
        socket.emit(`ami_connect`, {status: 'success', message: 'success'})

    // Подключен
    ami.on('connected', function () {
        socket.emit(`ami_connect`, {status: 'success', message: 'success'})
    });

    // Принятый звонок локальный
    ami.on('event', async function (event) {
        // Принятый звонок
        if (
            event.event === 'Newstate' &&
            event.context === 'sip-locals-callPermissions'
        ) {
            if (
                event.connectedlinenum === sip &&
                event.calleridnum !== sip
            ) {
                const lead = await LeadService.FindContactAndDial(event.calleridnum)
                socket.emit(`ami_newstate`, {
                    lead,
                    info: {
                        channelstate: event.channelstate,
                        channelstatedesc: event.channelstatedesc,
                        calleridnum: event.calleridnum,
                        uniqueid: event.uniqueid,
                        channel: event.channel,
                    },
                })
            } else if (
                event.connectedlinenum !== sip &&
                event.calleridnum === sip
            ) {
                currentChannel = event.channel
                currentExten = event.connectedlinenum !== '<unknown>' ?
                    event.connectedlinenum :
                    event.exten

                const lead = await LeadService.FindContactAndDial(currentExten)

                socket.emit(`ami_newstate`, {
                    lead,
                    info: {
                        channelstate: event.channelstate,
                        channelstatedesc: event.channelstatedesc,
                        calleridnum: event.exten,
                        uniqueid: event.uniqueid,
                        channel: event.channel,
                    },
                })
            } else if (
                event.channel === currentChannel &&
                event.calleridnum !== sip
            ) {
                const lead = await LeadService.FindContactAndDial(currentExten)
                socket.emit('ami_newstate', {
                    lead,
                    info: {
                        channelstate: event.channelstate,
                        channelstatedesc: event.channelstatedesc,
                        calleridnum: currentExten,
                        uniqueid: event.uniqueid,
                        channel: event.channel,
                    },
                })
            }
        }

        // Сбросить звонок
        if (event.event === 'Hangup' && event.channel.includes('SIP/' + sip)) {
            socket.emit(`ami_event_hangup`, {})
        }
    })
}

module.exports = {Connect}