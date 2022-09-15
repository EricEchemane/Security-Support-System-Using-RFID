import studentControllers from "@controllers/student.controllers";
import normalize from "@utils/response-normalizer";
import { Router } from "express";

const studentRoutes = Router();

studentRoutes.get("/:rfid", normalize(studentControllers.getByRfid));
studentRoutes.post("/", normalize(studentControllers.create));

export default studentRoutes;