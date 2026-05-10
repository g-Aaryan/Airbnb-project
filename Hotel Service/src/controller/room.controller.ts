import { findByRoomCategoryIdAndDateService, updatebookingService } from "../services/inventory.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
export async function findbyroomCategoryIdAndDaterangeHandler(req: Request, res: Response, next: NextFunction) {

    const roomResponse = await findByRoomCategoryIdAndDateService({
        roomCategoryId: Number(req.query.roomCategoryId),
        checkinDate: new Date(req.query.checkinDate as string),
        checkoutDate: new Date(req.query.checkoutDate as string)
    });
       

        res.status(StatusCodes.OK).json({
            message: "Rooms found successfully",
            data: roomResponse,
            success: true,
        })
};

export async function updatebookingHandler(req: Request, res: Response, next: NextFunction) {

    const roomResponse = await updatebookingService(req.body);
    res.status(StatusCodes.OK).json({
        message: "Rooms updated successfully",
        data: roomResponse,
        success: true,
    })
}