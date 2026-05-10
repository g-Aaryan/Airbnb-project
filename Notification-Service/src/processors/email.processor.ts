import { Job, Worker } from "bullmq";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { getRedisConnObject } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { renderMailTemplate } from "../templates/template.handler";
import { sendEmail } from "../services/mailer.service";
import logger from "../config/logger.config";

export const setupMailerWorker = () => {

    const emailProcessor = new Worker<NotificationDto>(
        MAILER_QUEUE, // Name of the queue
        async (job: Job) => {

            if(job.name !== MAILER_PAYLOAD) {
                throw new Error("Invalid job name");
            }

            // call the service layer from here.
            const payload = job.data;
            console.log(`Processing email for: ${JSON.stringify(payload)}`);

            const emailContent = await renderMailTemplate(payload.templateId, payload.params);
            console.log(payload.templateId, payload.params, emailContent);

            await sendEmail(payload.to, payload.subject, emailContent);

            logger.info(`Email sent to ${payload.to} with subject "${payload.subject}"`);

        }, // Process function
        {
            connection: getRedisConnObject() as any
        }
    )

emailProcessor.on("failed", (job, err) => {
    console.error("Email processing failed");
    console.error("Job ID:", job?.id);
    console.error("Error:", err);
});
    emailProcessor.on("completed", () => {
        console.log("Email processing completed successfully");
    });
}