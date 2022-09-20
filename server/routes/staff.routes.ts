import staffControllers from "@controllers/staff.controllers";
import normalize from "@utils/response-normalizer";
import { Router } from "express";

const staffRoutes = Router();
staffRoutes.post("/time-in", normalize(staffControllers.timeIn));
staffRoutes.post("/time-out", normalize(staffControllers.timeOut));
staffRoutes.get("/:rfid", normalize(staffControllers.getByRfid));
staffRoutes.post("/", normalize(staffControllers.create));

export default staffRoutes;