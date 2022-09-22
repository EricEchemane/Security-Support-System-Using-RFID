import getDbConnection from "@db/db-connection";
import { IStudent } from "@entities/student.model";
import { RequestError } from "@utils/request";
import { Request } from "express";

const studentControllers = {
    getByRfid: async (req: Request) => {
        const { rfid } = req.params;
        if (!rfid) throw new RequestError(400, "RFID is required");

        const db = await getDbConnection();
        const { Student, Staff } = db.models;

        const staff = await Staff.findByRfid(rfid);
        if (staff) return staff;

        const student = await Student.findByRfid(rfid);
        if (!student) throw new RequestError(404, "Student not found");

        return student;
    },
    create: async (req: Request) => {
        if (req.method !== 'POST') throw new RequestError(405, "Method not allowed");
        const body: IStudent = req.body;
        if (body.photo === "/student_photo_placeholder.jpg") {
            throw new RequestError(400, "Photo is required");
        }
        const db = await getDbConnection();
        const { Student, Staff } = db.models;

        const staff = await Staff.findByRfid(body.rfid);
        if (staff) throw new RequestError(400, "RFID already used by a staff");

        const newStudent = new Student(body);

        await newStudent.save();
        return newStudent;
    },
    timeIn: async (req: Request) => {
        if (req.method !== 'POST') throw new RequestError(405, "Method not allowed");
        const { rfid } = req.body;
        if (!rfid) throw new RequestError(400, "RFID is required");

        const db = await getDbConnection();
        const { Student } = db.models;

        const student = await Student.findByRfid(rfid);
        if (!student) throw new RequestError(404, "Student not found");

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
    },
    timeOut: async (req: Request) => {
        if (req.method !== 'POST') throw new RequestError(405, "Method not allowed");
        const { rfid } = req.body;
        if (!rfid) throw new RequestError(400, "RFID is required");

        const db = await getDbConnection();
        const { Student } = db.models;

        const student = await Student.findByRfid(rfid);
        if (!student) throw new RequestError(404, "Student not found");

        const lastTimeIn = student.visitationRecords[student.visitationRecords.length - 1];
        if (lastTimeIn && lastTimeIn.timeOut !== null) throw new RequestError(400, "Student already time out");
        else {
            lastTimeIn.timeOut = new Date();
            await student.save();
            return student;
        }
    }
};

export default studentControllers;