export type GetAvailableRoomsDTO = {
    roomCategoryId: number;
    checkinDate: Date;
    checkoutDate: Date;
}

export type updatebookingDTO = {
    bookingId: number;
    roomIds: number[];
}