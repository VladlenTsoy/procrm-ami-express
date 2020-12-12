module.exports = {
    apps: [
        {
            name: "pbx-local",
            script: 'bin/www',
            watch: true,
            env: {
                "NODE_ENV": "production",
                "APP_MODE": "production",
                "APP_CORS": "*",
                "APP_PORT": "3000",

                "DB_HOST": "127.0.0.1",
                "DB_LOGIN": "root",
                "DB_PASSWORD": "root",
                "DB_TABLE": "procrm",
                "DB_PREFIX": "tbl",

                "AMI_HOST": "iptel.uz",
                "AMI_PORT": "5038",
                "AMI_LOGIN": "kerio_ami",
                "AMI_PASSWORD": "kerio_ami5987455",
            },
            env_production: {
                "NODE_ENV": "production",
                "APP_MODE": "production",
                "APP_CORS": "*",
                "APP_PORT": "3000",

                "DB_HOST": "127.0.0.1",
                "DB_LOGIN": "root",
                "DB_PASSWORD": "root",
                "DB_TABLE": "procrm",
                "DB_PREFIX": "tbl",

                "AMI_HOST": "iptel.uz",
                "AMI_PORT": "5038",
                "AMI_LOGIN": "kerio_ami",
                "AMI_PASSWORD": "kerio_ami5987455",
            }
        },
    ],
};
