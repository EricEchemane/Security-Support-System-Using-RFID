import isValidEmail from "@app/utils/email-validator";
import mongoose from "mongoose";

export interface IStudent {
    _id?: mongoose.Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    nameExtension: string;
    birthDate: Date;
    rfid: string;
    mobileNumber: string;
    section: string;
    department: string;
    yearLevel: string;
    strand: string;
    isCollege: boolean;
    course: string;
    visitationRecords?: {
        date: Date,
        timeIn: Date,
        timeOut: Date,
    }[];
    createdAt?: Date;
    updatedAt?: Date;
}

const StudentSchema = new mongoose.Schema<IStudent>({
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
    isCollege: {
        type: Boolean,
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

const Student = mongoose.model("Student", StudentSchema);

StudentSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

export default Student;
