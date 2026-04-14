import express from "express";
import { validateRequestBody } from "../../validators";
import { createBookingSchema } from "../../validators/booking.validator";
import { createBookingController } from "../../controller/booking.controller";
const bookingRouter = express.Router();

bookingRouter.post('/',validateRequestBody(createBookingSchema),createBookingController)

export default bookingRouter;