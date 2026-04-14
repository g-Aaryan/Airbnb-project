import z from "zod";

export const createBookingSchema = z.object({
    userId: z.number,
    hotelId: z.number,
    totalGuest: z.number,
    bookingAmount: z.number
})