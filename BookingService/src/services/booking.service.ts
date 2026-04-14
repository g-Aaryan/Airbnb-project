import { CreateBookingDTO } from "../dto/createbookingdto";
import { confirmBooking, createBooking, createidempotency, finalizeIdempotencyKey, getIdempotencyKey } from "../repositories/booking.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateidempotency";

export async function createBookingservice(createBookingDTO: CreateBookingDTO){
    const booking = await createBooking({
        userId: createBookingDTO.userId,
        hotelId: createBookingDTO.hotelId,
        totalGuests: createBookingDTO.totalGuest,
        bookingAmount: createBookingDTO.bookingAmount,
    })

    const idempotencyKey = generateIdempotencyKey();
    await createidempotency(idempotencyKey, booking.id)
    return {    
        bookingId : booking.id,
        idempotencyKey : idempotencyKey
    }
};

export async function confirmBookingservice(idempotencyKey: string){
    const idempotencyKeyData = await getIdempotencyKey(idempotencyKey)

    if(!idempotencyKeyData){
        throw new NotFoundError("Invalid idempotency key");
    }

    if(idempotencyKeyData.finalized){
        throw new BadRequestError("Booking already finalized");

    }

    const booking = await confirmBooking(idempotencyKeyData.bookingId)
    await finalizeIdempotencyKey(idempotencyKey);
    return booking;
}
