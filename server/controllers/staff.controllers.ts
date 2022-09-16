import getDbConnection from "@db/db-connection";
import { IStaff } from "@entities/staff.model";
import { RequestError } from "@utils/request";
import { Request } from "express";

const staffControllers = {
    getByRfid: async (req: Request) => {
        const { rfid } = req.params;
        if (!rfid) throw new RequestError(400, "RFID is required");

        const db = await getDbConnection();
        const { Staff } = db.models;

        const staff = await Staff.findByRfid(rfid);
        if (!staff) throw new RequestError(404, "Student not found");

        return staff;
    },
    create: async (req: Request) => {
        if (req.method !== 'POST') throw new RequestError(405, "Method not allowed");
        const body: IStaff = req.body;

        const db = await getDbConnection();
        const { Staff } = db.models;
        const newStaff = new Staff(body);

        await newStaff.save();
        return newStaff;
    }
};

export default staffControllers;