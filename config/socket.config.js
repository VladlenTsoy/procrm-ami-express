const socket = require("socket.io");

const socketSetting = (app) => {
    app.io = socket({
        cors: {
            origin: 'https://procrm.loc',
            credentials: true
        }
    });

    app.use(function(request, response, next) {
        request.io = app.io
        next()
    })
};

module.exports = {socketSetting}