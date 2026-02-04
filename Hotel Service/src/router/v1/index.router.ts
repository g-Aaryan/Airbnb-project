import express from "express";
import pingRouter from "./ping.router";
import hotelRouter from "./hotel..router";

const v1router = express.Router();

v1router.use('/ping',pingRouter)
v1router.use('/hotels', hotelRouter);

export default v1router;