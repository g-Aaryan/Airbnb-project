import { Request, Response, NextFunction } from "express";
import { generateRooms } from "../services/roomGeneration.service";

export async function generateRoomHandler(req: Request, res: Response) {


    const result = await generateRooms(req.body);

    res.status(200).json({
        message: "Rooms generated successfully",
        success: true,
        data: result,
    })
}