import z from "zod";

export const getAvailableRoomsValidationschema = z.object({
    roomCategoryId: z.number(),
    checkinDate: z.string().datetime(),
    checkoutDate: z.string().datetime()
})