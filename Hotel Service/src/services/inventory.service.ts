import { GetAvailableRoomsDTO, updatebookingDTO } from "../dto/room.dto";
import {RoomRepository} from "../repositories/room.repository";

const roomrepository = new RoomRepository();

export async function findByRoomCategoryIdAndDateService(getavailabeleroomsdto : GetAvailableRoomsDTO) {
    return await roomrepository.findbyroomCategoryIdAndDaterange(getavailabeleroomsdto.roomCategoryId, getavailabeleroomsdto.checkinDate, getavailabeleroomsdto.checkoutDate);
}

export async function updatebookingService(updatebookingDTO: updatebookingDTO) {
    return await roomrepository.updateBookingIdForDateRange(updatebookingDTO.bookingId, updatebookingDTO.roomIds);
}

