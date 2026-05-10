import z from "zod";

export const getAvailableRoomsValidationschema = z.object({
    roomCategoryId: z.string(),
    checkinDate: z.string().datetime(),
    checkoutDate: z.string().datetime()
})

export const updatebookingValidationschema = z.object({
    bookingId: z.number(),
    roomIds: z.array(z.number())
})