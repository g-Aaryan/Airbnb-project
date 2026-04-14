import {prisma} from "../lib/prisma";

import { IdempotencyKey, Prisma } from "../generated/prisma/client";
import { validate } from "uuid";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";

export async function createBooking(bookingInput: Prisma.BookingCreateInput) {
    const booking = await prisma.booking.create({
        data: bookingInput
    });

    return booking;
}


export async function createidempotency(key: string , bookingId: number) {
    const idempotencyKey = await prisma.idempotencyKey.create({
        data:{
            idemkey: key,
            booking:{
                connect:{
                    id: bookingId
                }
            }
        }
    })

    return idempotencyKey;
}

export async function getIdempotencyKeywithlock(tx:Prisma.TransactionClient,key: string){
    if(!validate(key)){
        throw new BadRequestError("Invalid idempotency key format");
    }

    const idempotencyKey: Array<IdempotencyKey> = await tx.$queryRaw(
        Prisma.raw(`SELECT * FROM IdempotencyKey WHERE idemkey = '${key}'FOR UPDATE`)
    )

    if(!idempotencyKey || idempotencyKey.length === 0){
        throw new NotFoundError("Idempotency key not found");
    }
    
    return idempotencyKey[0];
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

export async function confirmBooking(tx:Prisma.TransactionClient,bid:number){
    const booking = await tx.booking.update({
        where:{
            id : bid
        },
        data:{
            status: "CONFIRMED"
        }
    });
    return booking;
}

export async function finalizeIdempotencyKey(tx:Prisma.TransactionClient,key: string){
    const idempotencyKey = await tx.idempotencyKey.update({
        where:{
            idemkey: key
        },
        data:{
            finalized: true
        }
    })
    return idempotencyKey;
}