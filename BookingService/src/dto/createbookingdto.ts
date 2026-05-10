export type CreateBookingDTO = {
    userId: number;
    hotelId: number;
    totalGuest: number;
    bookingAmount: number;
    roomCaegoryId: number;
    checkInDate: string; // ISO date string
    checkOutDate: string; // ISO date string
}