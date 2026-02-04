import express from 'express';
import { validateRequestBody } from '../../validators';
import { hotelSchema } from '../../validators/hotel.validator';
import { createHotelHandler, deleteHotelHandler, getAllHotelsHandler, getHotelByIdHandler } from '../../controller/hotel.controller';

const hotelRouter = express.Router();

hotelRouter.post(
    '/', 
    validateRequestBody(hotelSchema),
    createHotelHandler); 

hotelRouter.get('/:id', getHotelByIdHandler);
hotelRouter.get('/',getAllHotelsHandler)
hotelRouter.delete('/:id',deleteHotelHandler)

export default hotelRouter;