import express from "express";
import pingRouter from "./ping.router";
import bookingRouter from "./booking.router";

const v1router = express.Router();

v1router.use('/ping',pingRouter)
v1router.use('/bookings', bookingRouter);

export default v1router;