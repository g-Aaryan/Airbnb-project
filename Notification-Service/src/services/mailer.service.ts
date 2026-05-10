import { serverconfig } from "../config";
import transporter from "../config/mailer.config";
import { InternalServerError } from "../utils/errors/app.error";

export async function sendEmail(
    to: string,
    subject: string,
    body: string
) {

    try {

        console.log("Sending email to:", to);

        console.log("MAIL USER:", serverconfig.MAIL_USER);
        console.log("MAIL PASS:", serverconfig.MAIL_PASS);

        const response = await transporter.sendMail({
            from: serverconfig.MAIL_USER,
            to,
            subject,
            html: body
        });

        console.log("EMAIL SENT SUCCESSFULLY");
        console.log(response);

        return response;

    } catch (error) {

        console.error("NODEMAILER ACTUAL ERROR:");
        console.error(error);

        throw new InternalServerError(
            `Failed to send email: ${error}`
        );
    }
}