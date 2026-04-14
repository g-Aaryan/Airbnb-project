import { CreateBookingDTO } from "../dto/createbookingdto";
import { confirmBooking, createBooking, createidempotency, finalizeIdempotencyKey, getIdempotencyKeywithlock } from "../repositories/booking.repository";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateidempotency";
import {prisma} from "../lib/prisma";
import { serverconfig } from "../config";
import { redlock } from "../config/redis.config";

export async function createBookingservice(createBookingDTO: CreateBookingDTO){
    const ttl = serverconfig.LOCK_TTL;
    const bookingResource = 'hotel:${createBookingDTO.hotelId}';

    try{
        await redlock.acquire([bookingResource], ttl);
        const booking = await createBooking({
            userId: createBookingDTO.userId,
            hotelId: createBookingDTO.hotelId,
            totalGuests: createBookingDTO.totalGuest,
            bookingAmount: createBookingDTO.bookingAmount
        });

        const idempotencyKey = generateIdempotencyKey();
        await createidempotency(idempotencyKey, booking.id);
        return {bookingId: booking.id,
                idempotencyKey: idempotencyKey
            };
    } catch (error) {
        throw new InternalServerError("Failed to acquire lock for booking");
    }
};

export async function confirmBookingservice(idempotencyKey: string){
    return await prisma.$transaction(async (tx) => {
        const idempotencyKeyData = await getIdempotencyKeywithlock(tx, idempotencyKey);
        if(!idempotencyKeyData||!idempotencyKeyData.bookingId){
            throw new NotFoundError("Invalid idempotency key");
        }
        
        if(idempotencyKeyData.finalized){
            throw new BadRequestError("Booking already finalized");

        }
        const booking = await confirmBooking(tx, idempotencyKeyData.bookingId);
        await finalizeIdempotencyKey(tx, idempotencyKey);

        return booking;
    })
}
