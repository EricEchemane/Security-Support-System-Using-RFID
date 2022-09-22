import getDbConnection from "@db/db-connection";
import { IStaff } from "@entities/staff.model";
import { RequestError } from "@utils/request";
import { Request } from "express";

const staffControllers = {
    getByRfid: async (req: Request) => {
        const { rfid } = req.params;
        if (!rfid) throw new RequestError(400, "RFID is required");

        const db = await getDbConnection();
        const { Staff, Student } = db.models;

        const student = await Student.findByRfid(rfid);
        if (student) return student;

        const staff = await Staff.findByRfid(rfid);
        if (!staff) throw new RequestError(404, "Staff not found");

        return staff;
    },
    create: async (req: Request) => {
        if (req.method !== 'POST') throw new RequestError(405, "Method not allowed");
        const body: IStaff = req.body;

        if (body.photo === "/student_photo_placeholder.jpg") {
            throw new RequestError(400, "Photo is required");
        }

        const db = await getDbConnection();
        const { Staff, Student } = db.models;

        const student = await Student.findByRfid(body.rfid);
        if (student) throw new RequestError(400, "RFID already used by a student");

        const newStaff = new Staff(body);

        await newStaff.save();
        return newStaff;
    },
    timeIn: async (req: Request) => {
        if (req.method !== 'POST') throw new RequestError(405, "Method not allowed");
        const { rfid } = req.body;
        if (!rfid) throw new RequestError(400, "RFID is required");

        const db = await getDbConnection();
        const { Staff } = db.models;

        const staff = await Staff.findByRfid(rfid);
        if (!staff) throw new RequestError(404, "Staff not found");

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
    },
    timeOut: async (req: Request) => {
        if (req.method !== 'POST') throw new RequestError(405, "Method not allowed");
        const { rfid } = req.body;
        if (!rfid) throw new RequestError(400, "RFID is required");

        const db = await getDbConnection();
        const { Staff } = db.models;

        const staff = await Staff.findByRfid(rfid);
        if (!staff) throw new RequestError(404, "Staff not found");

        const lastTimeIn = staff.visitationRecords[staff.visitationRecords.length - 1];
        if (lastTimeIn && lastTimeIn.timeOut !== null) throw new RequestError(400, "Staff already time out");
        else {
            lastTimeIn.timeOut = new Date();
            await staff.save();
            return staff;
        }
    }
};

export default staffControllers;