import { findByRoomCategoryIdAndDateService } from "../services/inventory.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
export async function findbyroomCategoryIdAndDaterangeHandler(req: Request, res: Response, next: NextFunction) {

    const roomResponse = await findByRoomCategoryIdAndDateService(req.body);
       

        res.status(StatusCodes.OK).json({
            message: "Rooms found successfully",
            data: roomResponse,
            success: true,
        })
};