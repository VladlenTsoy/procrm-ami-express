const AmiIo = require("ami-io");

const SilentLogger = new AmiIo.SilentLogger();

const ami = AmiIo.createClient({
    port: process.env.AMI_PORT,
    host: process.env.AMI_HOST,
    login: process.env.AMI_LOGIN,
    password: process.env.AMI_PASSWORD,
    encoding: 'ascii',
    logger: SilentLogger
})

ami.on('incorrectServer', function () {
    console.log('incorrectServer')
});

ami.on('connectionRefused', function () {
    console.log('connectionRefused')
});

ami.on('incorrectLogin', function () {
    console.log('incorrectLogin')
});

ami.unref()
ami.connect(true);

const amiSetting = (app) => {
    app.ami = ami;

    app.use(function(request, response, next) {
        request.ami = app.ami
        next()
    })
}

module.exports = {amiSetting, ami}