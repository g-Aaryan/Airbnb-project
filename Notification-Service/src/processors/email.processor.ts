import { Job, Worker } from "bullmq"
import { NotificationDto } from "../dto/notification.dto"
import { MAILER_QUEUE } from "../queues/mailer.queue"
import { MAILER_PAYLOAD } from "../producers/email.producer"
import { getRedisConnObject } from "../config/redis.config"


export const setupmailerworker = ()=>{
    const emailProcessor = new Worker<NotificationDto>(MAILER_QUEUE, async (job:Job)=>{
        if(job.name !== MAILER_PAYLOAD){
            throw new Error("Invalid job name")
        }

        const payload = job.data
        console.log(`Processing email job with payload: ${JSON.stringify(payload)}`)
        },
        {connection: getRedisConnObject() as any})

    emailProcessor.on("completed", ()=>{
        console.log("job done")
    })
    emailProcessor.on("failed", ()=>{
        console.log("job failed")
    })
}