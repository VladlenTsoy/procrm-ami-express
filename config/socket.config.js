const socket = require("socket.io");

const socketSetting = (app) => {
    app.io = socket({
        cors: {
            origin: process.env.APP_MODE === 'development' ? 'https://procrm.loc' : 'https://help.procrm.uz',
            credentials: true
        }
    });

    app.use(function(request, response, next) {
        request.io = app.io
        next()
    })
};

module.exports = {socketSetting}