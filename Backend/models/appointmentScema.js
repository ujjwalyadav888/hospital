import validator from "validator";
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name should contain at least 3 characters"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, "Last name should contain at least 3 characters"],
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email",
      },
    },
    phone: {
      type: String,
      required: true,
      minLength: [10, "phone number should contain at least 10 characters"],
      maxLength: [10, "phone number should contain at least 10 characters"],
    },
    dob: {
      type: Date,
      required: [true, "DOB is required"],
      set: (value) => {
        if (typeof value === "string" && value.includes("/")) {
          const [day, month, year] = value.split("/");
          return new Date(`${year}-${month}-${day}`);
        }
        return value;
      },
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    appointment_Date: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    doctor: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    hasVisited:{
        type:Boolean,
        default:false,
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model("Appointment",appointmentSchema)