import { CreateBookingDTO } from "../dto/createbookingdto";
import { confirmBooking, createBooking, createidempotency, finalizeIdempotencyKey, getIdempotencyKeywithlock } from "../repositories/booking.repository";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateidempotency";
import {prisma} from "../lib/prisma";
import { serverconfig } from "../config";
import { redlock } from "../config/redis.config";
import { getavailableRooms, updatebooking } from "../api/hotel.api";

type availableRoom = {
    id: number;
    roomCategoryId: number;
    dateofavailability: string;
}

export async function createBookingservice(createBookingDTO: CreateBookingDTO){
    const ttl = serverconfig.LOCK_TTL;
    const bookingResource = 'hotel:${createBookingDTO.hotelId}';
    const availableRooms = await getavailableRooms(createBookingDTO.roomCaegoryId, createBookingDTO.checkInDate, createBookingDTO.checkOutDate);


    const totalNights = (new Date(createBookingDTO.checkOutDate).getTime() - new Date(createBookingDTO.checkInDate).getTime())/(1000*3600*24);
    if(availableRooms.length === 0|| availableRooms.length<totalNights){
        throw new BadRequestError("No rooms available for the selected category and dates");
    }
    try{
        await redlock.acquire([bookingResource], ttl);
        const booking = await createBooking({
            userId: createBookingDTO.userId,
            hotelId: createBookingDTO.hotelId,
            totalGuests: createBookingDTO.totalGuest,
            bookingAmount: createBookingDTO.bookingAmount,
            checkInDate: new Date(createBookingDTO.checkInDate),
            checkOutDate: new Date(createBookingDTO.checkOutDate),
            roomCategoryid: createBookingDTO.roomCaegoryId
        });

        const idempotencyKey = generateIdempotencyKey();
        await createidempotency(idempotencyKey, booking.id);

        await updatebooking(booking.id,availableRooms.data.map((room: availableRoom) => room.id));
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
