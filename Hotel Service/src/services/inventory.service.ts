import { GetAvailableRoomsDTO } from "../dto/room.dto";
import {RoomRepository} from "../repositories/room.repository";

const roomrepository = new RoomRepository();

export async function findByRoomCategoryIdAndDateService(getavailabeleroomsdto : GetAvailableRoomsDTO) {
    return await roomrepository.findbyroomCategoryIdAndDaterange(getavailabeleroomsdto.roomCategoryId, getavailabeleroomsdto.checkinDate, getavailabeleroomsdto.checkoutDate);
}