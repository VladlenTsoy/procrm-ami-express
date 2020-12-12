module.exports = {
    development: {
        client: 'mysql2',
        version: '5.8',
        jsonDatatype: 'JSON',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_TABLE,
            user: process.env.DB_LOGIN,
            password: process.env.DB_PASSWORD,
        },
        migrations: {
            directory: `${__dirname}/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/database/seeds`
        }
    },

    production: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_TABLE,
            user: process.env.DB_LOGIN,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
