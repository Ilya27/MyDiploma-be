const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
const Mustache = require('mustache');
const config = require("../../config");


class Mailer {
    constructor() {
        const {host, user, password, port} = config.mailer.SMTP;
        this.supportEmail = config.mailer.supportEmail;
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465, // true for 465, false for other ports
            auth: {
                user,
                pass: password,
            },
        });
    }

    async sendRequestToSupport(supportRequest) {

        const templateFile = this._getTemplateFile(
            `contact-us/user.html`);

        const {email, text} = supportRequest;
        const htmlMail = Mustache.render(templateFile.toString(), {
            date: new Date(supportRequest.createdTime).toUTCString(),
            account: supportRequest.account,
            email, text,
        });

        return this.sendMailToSupport(`Support`, htmlMail);
    }

    async sendMailToSupport(subject, html, plainText) {
        return this.sendMail(this.supportEmail, subject, html, plainText)
    }


    async sendMail(to, subject = "Hello ✔", html, plainText) {
        try {
            const info = await this.transporter.sendMail({
                from: `<${config.mailer.SMTP.user}>`,
                to,
                subject,
                text: plainText,
                html,
            });

            Mailer.logMail(info);

            return info;
        } catch (e) {
            console.error(e);
            e.name = "MailerSendError";
            throw e;
        }
    }

    static logMail(info) {
        console.log("Message sent: %s", info.messageId);
    }

    /*
    *  _getTemplateFile
    *   get raw html from config.mustache.html_templates_folder ( core/helpers/html )
    * */
    _getTemplateFile(htmlFilePath) {
        const filePath = path.join(config.reports.templates_folder, htmlFilePath);
        return fs.readFileSync(filePath);
    }

}

module.exports = new Mailer();
