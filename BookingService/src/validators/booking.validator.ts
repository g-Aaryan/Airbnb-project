import z from "zod";

export const createBookingSchema = z.object({
    userId: z.number(),
    hotelId: z.number(),
    totalGuest: z.number(),
    bookingAmount: z.number(),
    roomCategoryId: z.number({ message: "Room category ID must be present" }),
    checkInDate: z.string({ message: "Check-in date must be present" }),
    checkOutDate: z.string({ message: "Check-out date must be present" }),
})