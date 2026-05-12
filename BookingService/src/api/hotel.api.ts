import axios from "axios";
import { serverconfig } from "../config";
export const getavailableRooms = async (roomCategoryId: number, checkinDate: string, checkoutDate: string) => {
    const response = await axios.get(`${serverconfig.HOTEL_SERVICE_URL}/rooms/available`, {
        params: {
            roomCategoryId,
            checkinDate,
            checkoutDate
        }
    });
    return response.data;
}

export const updatebooking = async (bookingId: number, roomIds: number[]) => {
    const response = await axios.post(`${serverconfig.HOTEL_SERVICE_URL}/rooms/updatebooking`, {
        bookingId,
        roomIds
    }, {
        headers: {
            'X-Internal-Service-Token': process.env.INTERNAL_SERVICE_TOKEN || 'internal-secret-token'
        }
    });
    return response.data;
}