const {ami} = require('config/ami.config')
const AmiEvents = require('./ami.events')
const AmiChannel = require('./ami.channel')

module.exports = (socket) => {
    AmiEvents.Connect(socket)
    AmiEvents.Dial(socket)
    AmiChannel.Dial(socket)



    socket.on('disconnect', () => {
        // ami.disconnect();
    });
}