import express from 'express';
import { validateRequestBody } from '../../validators';
import { hotelSchema, updateHotelSchema } from '../../validators/hotel.validator';
import { createHotelHandler, deleteHotelHandler, getAllHotelsHandler, getHotelByIdHandler, updateHotelHandler } from '../../controller/hotel.controller';

const hotelRouter = express.Router();

hotelRouter.post(
    '/', 
    validateRequestBody(hotelSchema),
    createHotelHandler); 

hotelRouter.get('/:id', getHotelByIdHandler);
hotelRouter.get('/',getAllHotelsHandler);
hotelRouter.delete('/:id',deleteHotelHandler);
hotelRouter.put(
    '/:id',
    validateRequestBody(updateHotelSchema),
    updateHotelHandler
);

export default hotelRouter;