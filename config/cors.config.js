const cors = require('cors')
const corsConfig = cors({
    origin: 'https://procrm.loc',
    credentials: true,
});

module.exports = {corsConfig}