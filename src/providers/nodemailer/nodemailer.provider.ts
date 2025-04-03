import { environment } from '@src/environment';
import * as nodemailer from 'nodemailer';

export class NodemailerProvider {

    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: environment.smtpHost,
            port: environment.smtpPort,
            secure: false,
            auth: {
              user: environment.smtpEmail,
              pass: environment.smtpPassword,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
    }

    async sendEmail(to: string, subject: string, html: string) {
        return await this.transporter.sendMail({
            from: environment.smtpEmail,
            to,
            subject,
            html,
          });
    }
}