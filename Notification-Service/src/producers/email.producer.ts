import { NotificationDto } from "../dto/notification.dto"
import { mailerQueue } from "../queues/mailer.queue"

export const MAILER_PAYLOAD = "payload:mail"

export const addtoqueue = async (payload : NotificationDto)=>{
    await mailerQueue.add(MAILER_PAYLOAD, payload)
    console.log(`email added to the queue ${JSON.stringify(payload)}`)
}