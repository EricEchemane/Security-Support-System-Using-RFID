import Staff from "@app/models/staff.model";
import Student from "@app/models/student.model";
import mongoose from "mongoose";

type DB = typeof mongoose & {
    models: {
        Student: typeof Student;
        Staff: typeof Staff;
    };
};

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

    db = connection as DB;

    return db;
}