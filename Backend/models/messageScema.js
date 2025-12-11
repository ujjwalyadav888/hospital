import mongoose from "mongoose";
import validator from "validator"

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,  
        minLength: [3, "First name should contain at least 3 characters"]
    },
    lastName: {
        type: String,
        required: true, 
        minLength: [3, "Last name should contain at least 3 characters"]
    },
    email: {
        type: String,
        required: true,  
        validate: {      
            validator: validator.isEmail,
            message: "Please enter a valid email"
        }
    },
    phone: {
        type: String,
        required: true, 
         minLength: [10, "phone number should contain at least 10 characters"],
         maxLength: [10, "phone number should contain at least 10 characters"]
    },
    message: {
        type: String,
        required: true,  
        minLength: [10, "Message should contain at least 10 characters"]
    }
}, {
    timestamps: true  // Added timestamps for created_at and updated_at
})

export const Message= mongoose.model("Message", messageSchema)