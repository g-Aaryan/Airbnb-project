import { createHotelDTO } from "../dto/hotel.dto";
import { createHotel, softDeleteHotel, getAllHotel, getHotelById } from "../repositories/hotel.repository";

export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await createHotel(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await getHotelById(id);
    return hotel;
}

export async function getAllHotelService() {
    const hotel = await getAllHotel();
    return hotel;
}

export async function softDeleteHotelService(id:number) {
    await softDeleteHotel(id);
}