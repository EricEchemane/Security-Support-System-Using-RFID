import getDbConnection from "@db/db-connection";
import { IStudent } from "@entities/student.model";
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
    },
    create: async (req: Request) => {
        if (req.method !== 'POST') throw new RequestError(405, "Method not allowed");
        const body: IStudent = req.body;

        const db = await getDbConnection();
        const { Student } = db.models;
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
        const today = new Date();
        const todayDate = today.toISOString().split('T')[0];
        const timeInToday = student.visitationRecords.find(record => record.date.toISOString().split('T')[0] === todayDate);
        if (timeInToday) throw new RequestError(400, "You are already time in today");

        student.visitationRecords.push({
            date: new Date(),
            timeIn: new Date(),
            timeOut: null,
        });
        await student.save();
        return student;
    }
};

export default studentControllers;