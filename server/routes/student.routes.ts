import studentControllers from "@controllers/student.controllers";
import normalize from "@utils/response-normalizer";
import { Router } from "express";

const studentRoutes = Router();

studentRoutes.post("/time-in", normalize(studentControllers.timeIn));
studentRoutes.post("/time-out", normalize(studentControllers.timeOut));
studentRoutes.get("/:rfid", normalize(studentControllers.getByRfid));
studentRoutes.get("/get/all", normalize(studentControllers.getAll));
studentRoutes.post("/", normalize(studentControllers.create));

export default studentRoutes;