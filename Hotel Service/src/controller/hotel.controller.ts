import { Request, Response, NextFunction } from "express";
import { createHotelService, deleteHotelService, getAllHotelService, getHotelByIdService } from "../services/hotel.service";
// import { success } from "zod";

export async function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer

    const hotelResponse = await createHotelService(req.body);

    // 2. Send the response

    res.status(201).json({
        message: "Hotel created successfully",
        data: hotelResponse,
        success: true,
    })
}

export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer

    const hotelResponse = await getHotelByIdService(Number(req.params.id));

    // 2. Send the response

    res.status(200).json({
        message: "Hotel found successfully",
        data: hotelResponse,
        success: true,
    })
}

export async function getAllHotelsHandler(req: Request, res: Response, next: NextFunction) {
    const hotelResponse = await getAllHotelService();
    res.status(200).json({
        message:"Here are the all hotels",
        data:hotelResponse,
        success:true
    });

}

export async function deleteHotelHandler(req: Request, res: Response, next: NextFunction) {
    await deleteHotelService(Number(req.params.id))
    res.status(200).json({
         message: "Successfully deleted"
    });
}

export async function updateHotelHandler(req: Request, res: Response, next: NextFunction) {
    
    res.status(501);
    
}