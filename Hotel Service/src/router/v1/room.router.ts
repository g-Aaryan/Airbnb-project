import { findbyroomCategoryIdAndDaterangeHandler } from "../../controller/room.controller";
import { validateRequestBody } from "../../validators";
import { getAvailableRoomsValidationschema } from "../../validators/room.validator";

const roomRouter = require("express").Router();
roomRouter.get("/available", validateRequestBody(getAvailableRoomsValidationschema),findbyroomCategoryIdAndDaterangeHandler);

export default roomRouter;