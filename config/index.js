const envs = require('../envs');
const path = require('path');

module.exports = {

    database: {

        mongodb: {
            link: process.env.MONGODB_URL,
        }

    },

    api: {
        urlPrefix: process.env.URL_PREFIX || '',
        defaultAdminLogin: 'admin',
        defaultAdminEmail: process.env.DEFAULT_ADMIN_EMAIL,
        defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
    },

    server: {
        host: 'localhost',
        port: process.env.APP_PORT || 3000,
        saltKey: 'thexxtheeetheeeblablabla', //Do not change after deploy
    },

    mailer: {
        SMTP: {
            host: process.env.MAILER_SMTP_HOST,
            user: process.env.MAILER_SMTP_USER,
            password: process.env.MAILER_SMTP_PASSWORD,
            port: process.env.MAILER_SMTP_PORT,
        },

        supportEmail: process.env.MAILER_SUPPORT_EMAIL,
    },

    session: {
        time: 1000 * 60 * 43800, // 1 month
    },

    listing: {
        limit: 10,
        limitMax: 100,
        sort: 'desc'
    },

    media: {
        directory:
            process.env.MEDIA_DIRECTORY || "/usr/share/nginx/html/static",
        serverUrl:
            process.env.MEDIA_SERVER_URL || "http://localhost:3002",
        supportTypes: [
            'application/pdf',
            'image/pjpeg',
            'image/jpeg',
            'image/png',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]
    },

    staticServer: {
        port: process.env.STATIC_PORT || 3002
    },

    reports: {
        templates_folder:
            path.join(
                path.dirname(require.main.filename),
                'core', 'helpers', 'pdf_templates'
            )
    },
};
