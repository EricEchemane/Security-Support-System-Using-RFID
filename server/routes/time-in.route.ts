import getDbConnection from "@db/db-connection";
import { RequestError } from "@utils/request";
import normalize from "@utils/response-normalizer";
import { Router, Request, Response } from "express";

const timeInRoute = Router();

timeInRoute.get("/:rfid", normalize(async (req: Request, res: Response) => {
    const { rfid } = req.params;
    if (!rfid) throw new RequestError(400, "RFID is required");

    const db = await getDbConnection();
    const { Student, Staff } = db.models;

    const student = await Student.findByRfid(rfid);
    if (student) {
        // check if student is already time in today
        const lastTimeIn = student.visitationRecords[student.visitationRecords.length - 1];
        if (lastTimeIn && lastTimeIn.timeOut === null) throw new RequestError(400, "Student already time in");

        student.visitationRecords.push({
            date: new Date(),
            timeIn: new Date(),
            timeOut: null,
        });
        await student.save();
        return student;
    }

    const staff = await Staff.findByRfid(rfid);
    if (staff) {
        // check if staff is already time in today
        const lastTimeIn = staff.visitationRecords[staff.visitationRecords.length - 1];
        if (lastTimeIn && lastTimeIn.timeOut === null) throw new RequestError(400, "Staff already time in");

        staff.visitationRecords.push({
            date: new Date(),
            timeIn: new Date(),
            timeOut: null,
        });
        await staff.save();
        return staff;
    }

    throw new RequestError(404, "Record not found");
}));

export default timeInRoute;