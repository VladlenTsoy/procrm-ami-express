module.exports = {
    development: {
        client: 'mysql2',
        version: '5.8',
        jsonDatatype: 'JSON',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'procrm',
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
            user: process.env.DB_PASSWORD,
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
