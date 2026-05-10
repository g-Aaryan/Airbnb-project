import nodemailer from 'nodemailer';
import { serverconfig } from '.';

console.log("Mailer Config - MAIL_USER:", serverconfig.MAIL_USER);
console.log("Mailer Config - MAIL_PASS:", serverconfig.MAIL_PASS);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: serverconfig.MAIL_USER,
        pass: serverconfig.MAIL_PASS
    },
});

export default transporter;