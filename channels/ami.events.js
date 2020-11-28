const {ami} = require('config/ami.config')

const Connect = (socket) => {
    ami.on('incorrectServer', function () {
        socket.emit('ami_connect', {
            status: 'error',
            message: "Invalid AMI welcome message. Are you sure if this is AMI?"
        })
    });

    ami.on('connectionRefused', function () {
        socket.emit('ami_connect', {status: 'error', message: "Connection refused."})
    });

    ami.on('incorrectLogin', function () {
        socket.emit('ami_connect', {status: 'error', message: "Incorrect login or password."})
    });

    if (ami.connected)
        socket.emit(`ami_connect`, {status: 'success', message: 'success'})
    else
        ami.connect();

    ami.on('connected', function () {
        socket.emit(`ami_connect`, {status: 'success', message: 'success'})
    });
}

const Dial = (socket) => {
}

module.exports = {Connect, Dial}