import mongoose from "mongoose";
import validator from "validator"

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,  // Fixed: 'require' to 'required'
        minLength: [3, "First name should contain at least 3 characters"]
    },
    lastName: {
        type: String,
        required: true,  // Fixed: 'require' to 'required'
        minLength: [3, "Last name should contain at least 3 characters"]
    },
    email: {
        type: String,
        required: true,  // Fixed: 'require' to 'required'
        validate: {      // Fixed: 'validator' to 'validate'
            validator: validator.isEmail,
            message: "Please enter a valid email"
        }
    },
    phone: {
        type: String,
        required: true,  // Fixed: 'require' to 'required'
        minLength: [10, "Phone number should contain 10 digits"],
        maxLength: [10, "Phone number should contain 10 digits"]
    },
    message: {
        type: String,
        required: true,  // Fixed: 'require' to 'required'
        minLength: [10, "Message should contain at least 10 characters"]
    }
}, {
    timestamps: true  // Added timestamps for created_at and updated_at
})

export const Message= mongoose.model("Message", messageSchema)