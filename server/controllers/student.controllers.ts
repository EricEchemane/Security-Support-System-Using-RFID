import getDbConnection from "@db/db-connection";
import { RequestError } from "@utils/request";
import { Request } from "express";

const studentControllers = {
    getByRfid: async (req: Request) => {
        const { rfid } = req.params;
        if (!rfid) throw new RequestError(400, "RFID is required");

        const db = await getDbConnection();
        const { Student } = db.models;

        const student = await Student.findByRfid(rfid);
        if (!student) throw new RequestError(404, "Student not found");

        return student;
    }
};

export default studentControllers;