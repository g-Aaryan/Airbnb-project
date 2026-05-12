import { Request, Response } from "express";
import { generateRooms } from "../services/roomGeneration.service";
import { UnauthorizedError } from "../utils/errors/app.error";

function isAdmin(req: Request): boolean {
    const role = req.header('X-User-Role') || '';
    return role.includes('ADMIN') || role.includes('admin');
}

export async function generateRoomHandler(req: Request, res: Response) {
    if (!isAdmin(req)) {
        throw new UnauthorizedError("Only admins can generate rooms");
    }

    const result = await generateRooms(req.body);

    res.status(200).json({
        message: "Rooms generated successfully",
        success: true,
        data: result,
    })
}