import { Request, Response } from "express"
import { confirmBookingservice, createBookingservice } from "../services/booking.service"

export const createBookingController = async (req: Request, res: Response) => {
    const Booking = await createBookingservice(req.body)
    res.status(201).json({
        bookingId : Booking.bookingId,
        idempotencyKey : Booking.idempotencyKey
    })
}

export const confirmBookingController = async (req: Request, res: Response) => {
    const booking = await confirmBookingservice(req.params.idempotencyKey)
    res.status(200).json({
        bookingId: booking.id,
        status: booking.status,
    })
}