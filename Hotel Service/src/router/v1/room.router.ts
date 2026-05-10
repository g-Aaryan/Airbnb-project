import { findbyroomCategoryIdAndDaterangeHandler, updatebookingHandler } from "../../controller/room.controller";
import { validateQueryParams, validateRequestBody } from "../../validators";
import { getAvailableRoomsValidationschema, updatebookingValidationschema } from "../../validators/room.validator";

const roomRouter = require("express").Router();
roomRouter.get("/available", validateQueryParams(getAvailableRoomsValidationschema),findbyroomCategoryIdAndDaterangeHandler);
roomRouter.post("/updatebooking", validateRequestBody(updatebookingValidationschema), updatebookingHandler);

export default roomRouter;