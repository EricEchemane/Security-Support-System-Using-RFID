import isValidEmail from "@utils/email-validator";
import mongoose, { InferSchemaType } from "mongoose";

const StaffSchema = new mongoose.Schema({
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
    photo: {
        type: String,
        required: [true, "Please add a photo"]
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
    department: {
        type: String,
    },
    typeOfStaff: {
        type: String,
        required: [true, "Please add a type of staff"],
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

StaffSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

export type IStaff = InferSchemaType<typeof StaffSchema>;

const Staff = mongoose.model("Staff", StaffSchema);

export default Staff;