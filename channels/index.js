const AmiEvents = require('./ami.events')
const AmiChannel = require('./ami.channel')

module.exports = (socket) => {
    //
    AmiEvents.Connect(socket)

    //
    AmiChannel.Dial(socket)
    AmiChannel.Hangup(socket)
    AmiChannel.CheckStatus(socket)

    socket.on('disconnect', () => {
        // ami.disconnect();
    });
}