import isValidEmail from "@utils/email-validator";
import mongoose, { InferSchemaType } from "mongoose";

const StudentSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Please add an email"],
        validate: {
            validator: isValidEmail,
            message: "Invalid email address"
        }
    },
    firstName: {
        type: String,
        required: [true, "Please add a first name"],
        minLength: [2, "First name must be at least 2 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Please add a last name"],
        minLength: [2, "last name must be at least 2 characters"]
    },
    middleName: {
        type: String,
        required: [true, "Please add a middleName name"],
        minLength: [2, "middleName name must be at least 2 characters"]
    },
    nameExtension: {
        type: String,
    },
    birthDate: {
        type: Date,
        required: [true, "Please add a birth date"],
    },
    rfid: {
        type: String,
        required: [true, "Please add a rfid"],
        unique: true,
    },
    mobileNumber: {
        type: String,
        required: [true, "Please add a mobile number"],
        unique: true,
    },
    section: {
        type: String,
        required: [true, "Please add a section"],
    },
    department: {
        type: String,
    },
    yearLevel: {
        type: String,
        required: [true, "Please add a year level"],
    },
    strand: {
        type: String,
    },
    course: {
        type: String,
    },
    visitationRecords: [{
        date: Date,
        timeIn: Date,
        timeOut: Date,
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, {
    statics: {
        findByEmail: function (email) {
            return this.findOne({ email });
        },
        findByRfid: function (rfid) {
            return this.findOne({ rfid });
        }
    }
});

export type IStudent = InferSchemaType<typeof StudentSchema>;

StudentSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

export default StudentSchema;