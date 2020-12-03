const cors = require('cors')
const corsConfig = cors({
    origin: process.env.APP_MODE === 'development' ? 'https://procrm.loc' : 'https://help.procrm.uz',
    credentials: true,
});

module.exports = {corsConfig}