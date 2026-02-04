import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

export async function createHotel(hotelData: createHotelDTO) {
    const hotel = await Hotel.create({
        name: hotelData.name,
        address: hotelData.address,
        location: hotelData.location,
        rating: hotelData.rating,
        ratingCount: hotelData.ratingCount,
    });

    logger.info(`Hotel created: ${hotel.id}`);

    return hotel;
}

export async function getHotelById(id: number) {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel not found: ${id}`);
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }

    logger.info(`Hotel found: ${hotel.id}`);

    return hotel;
}

export async function getAllHotel() {
    const hotel = await Hotel.findAll();

    if(!hotel){
        logger.error('List is empty');
        throw new NotFoundError('Empty')
    }

    logger.info(`Hotels found: ${hotel}`);

    return hotel;

}

export async function deleteHotel(id:number) {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error('Hotel doesnt even exist')
        throw new NotFoundError('Hotel doesnt even exist')
    }

    await hotel.destroy();
}