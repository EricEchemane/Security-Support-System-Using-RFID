import Staff from "@entities/staff.model";
import Student from "@entities/student.model";
import mongoose from "mongoose";

type DB = typeof mongoose & {
    models: {
        Student: typeof Student;
        Staff: typeof Staff;
    };
};

let db: DB;

export default async function getDbConnection(): Promise<DB> {
    if (db) return db;

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not defined");

    db = (await mongoose.connect(uri, { dbName: 'rfid' })) as DB;
    db.models.Student = Student;
    db.models.Staff = Staff;

    return db as DB;
}