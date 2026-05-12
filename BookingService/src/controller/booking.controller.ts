import { Request, Response } from "express"
import { confirmBookingservice, createBookingservice } from "../services/booking.service"
import { addEmailToQueue } from "../producers/email.producer"

export const createBookingController = async (req: Request, res: Response) => {
    const userId = Number(req.header('X-User-ID'));
    if (!userId) {
        res.status(401).json({ error: "Missing or invalid user identity" });
        return;
    }
    const Booking = await createBookingservice({ ...req.body, userId })
    res.status(201).json({
        bookingId : Booking.bookingId,
        idempotencyKey : Booking.idempotencyKey
    })
}

export const confirmBookingController = async (req: Request, res: Response) => {
    const booking = await confirmBookingservice(req.params.idempotencyKey)
    
    // Send confirmation email
    const userEmail = req.header('X-User-Email');

    if (userEmail) {
        addEmailToQueue({
            to: userEmail,
            subject: "Your Booking is Confirmed!",
            templateId: "booking-confirmation",
            params: {
                name: "Guest",
                bookingId: booking.id,
                hotelId: booking.hotelId,
                checkIn: booking.checkInDate.toISOString().split('T')[0],
                checkOut: booking.checkOutDate.toISOString().split('T')[0],
                totalGuests: booking.totalGuests,
                bookingAmount: booking.bookingAmount
            }
        });
    }

    res.status(200).json({
        bookingId: booking.id,
        status: booking.status,
    })
}