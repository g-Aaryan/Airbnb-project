import express from "express";
import pingRouter from "./ping.router";
import hotelRouter from "./hotel..router";
import roomRouter from "./room.router";

const v1router = express.Router();

v1router.use('/ping',pingRouter)
v1router.use('/hotels', hotelRouter);

v1router.use('/rooms',roomRouter)

export default v1router;