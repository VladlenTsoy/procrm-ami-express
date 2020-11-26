const socket = require("socket.io");

const socketSetting = (app) => {
    app.io = socket();

    app.use(function(request, response, next) {
        request.io = app.io
        next()
    })
};

module.exports = {socketSetting}