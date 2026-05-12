import { Request, Response, NextFunction } from "express";
import { createHotelService, deleteHotelService, getAllHotelsService, getHotelByIdService, updateHotelService } from "../services/hotel.service";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError } from "../utils/errors/app.error";

function isAdmin(req: Request): boolean {
    const role = req.header('X-User-Role') || '';
    return role.includes('ADMIN') || role.includes('admin');
}

export async function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    if (!isAdmin(req)) {
        throw new UnauthorizedError("Only admins can create hotels");
    }

    // 1. Call the service layer

    const hotelResponse = await createHotelService(req.body);

    // 2. Send the response

    res.status(StatusCodes.CREATED).json({
        message: "Hotel created successfully",
        data: hotelResponse,
        success: true,
    })
}

export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer

    const hotelResponse = await getHotelByIdService(Number(req.params.id));

    // 2. Send the response

    res.status(StatusCodes.OK).json({
        message: "Hotel found successfully",
        data: hotelResponse,
        success: true,
    })
}

export async function getAllHotelsHandler(req: Request, res: Response, next: NextFunction) {

    // 1. Call the service layer

    const hotelsResponse = await getAllHotelsService();

    // 2. Send the response
    res.status(StatusCodes.OK).json({
        message: "Hotels found successfully",
        data: hotelsResponse,
        success: true,
    });

}

export async function deleteHotelHandler(req: Request, res: Response, next: NextFunction) {
    if (!isAdmin(req)) {
        throw new UnauthorizedError("Only admins can delete hotels");
    }

    // 1. Call the service layer

    const hotelsResponse = await deleteHotelService(Number(req.params.id));

    // 2. Send the response
    res.status(StatusCodes.OK).json({
        message: "Hotels deleted successfully",
        data: hotelsResponse,
        success: true,
    });
    
}

export async function updateHotelHandler(req: Request, res: Response, next: NextFunction) {
    if (!isAdmin(req)) {
        throw new UnauthorizedError("Only admins can update hotels");
    }

    const hotelResponse = await updateHotelService(Number(req.params.id), req.body);

    res.status(StatusCodes.OK).json({
        message: "Hotel updated successfully",
        data: hotelResponse,
        success: true,
    });
}