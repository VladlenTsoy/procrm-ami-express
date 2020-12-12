const cors = require('cors')
const corsConfig = cors({
    origin: process.env.APP_CORS,
    credentials: true,
});

module.exports = {corsConfig}