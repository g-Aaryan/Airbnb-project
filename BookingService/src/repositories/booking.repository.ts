import {prisma} from "../lib/prisma";

import { Prisma } from "../generated/prisma/client";

export async function createBooking(bookingInput: Prisma.BookingCreateInput) {
    const booking = await prisma.booking.create({
        data: bookingInput
    });

    return booking;
}


export async function createidempotency(key: string , bookingId: number) {
    const idempotencyKey = await prisma.idempotencyKey.create({
        data:{
            key,
            booking:{
                connect:{
                    id: bookingId
                }
            }
        }
    })

    return idempotencyKey;
}

export async function getIdempotencyKey(key: string){
    const idempotencyKey = await prisma.idempotencyKey.findUnique({
        where:{
            key
        }
    });
    return idempotencyKey;
}

export async function getBookingById(id: number) {
    const booking = await prisma.booking.findUnique({
        where: {
            id 
        }
    })

    return booking;
}

export async function cancelBooking(bid:number){
    const booking = await prisma.booking.update({
        where:{
            id : bid
        },
        data:{
            status: "CANCELLED"
        }
    });
    return booking;
} 

export async function confirmBooking(bid:number){
    const booking = await prisma.booking.update({
        where:{
            id : bid
        },
        data:{
            status: "CONFIRMED"
        }
    });
    return booking;
}

export async function finalizeIdempotencyKey(key: string){
    const idempotencyKey = await prisma.idempotencyKey.update({
        where:{
            key
        },
        data:{
            finalized: true
        }
    })
    return idempotencyKey;
}