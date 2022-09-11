import StaffSchema, { IStaff } from "@app/models/staff.model";
import StudentSchema, { IStudent } from "@app/models/student.model";
import mongoose from "mongoose";

type DB = typeof mongoose;

let db: DB;

export default async function connectDB() {
    if (db) return db;

    if (!process.env.MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI);
    if (!connection) {
        throw new Error("Error connecting to database");
    }
    if (!mongoose.models.Student) mongoose.model("Student", StudentSchema);
    if (!mongoose.models.Staff) mongoose.model("Staff", StaffSchema);

    db = connection;

    return db;
}