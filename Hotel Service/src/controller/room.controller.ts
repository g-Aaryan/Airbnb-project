import { findByRoomCategoryIdAndDateService, updatebookingService } from "../services/inventory.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError } from "../utils/errors/app.error";
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
    const internalToken = req.header('X-Internal-Service-Token');
    // Ensure we have a token and it matches the expected internal token. 
    // In production, this should be a secure random string stored in environment variables.
    if (!internalToken || internalToken !== (process.env.INTERNAL_SERVICE_TOKEN || 'internal-secret-token')) {
        throw new UnauthorizedError("Unauthorized internal service call");
    }

    const roomResponse = await updatebookingService(req.body);
    res.status(StatusCodes.OK).json({
        message: "Rooms updated successfully",
        data: roomResponse,
        success: true,
    })
}