import isValidEmail from "@app/utils/email-validator";
import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: isValidEmail,
            message: "Invalid email address"
        }
    }
}, {
    statics: {
        findByEmail: function (email) {
            return this.findOne({ email });
        }
    }
});

const Student = mongoose.model("Student", StudentSchema);
export default Student;