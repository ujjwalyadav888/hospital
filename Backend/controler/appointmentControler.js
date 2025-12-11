import { asyncerror } from "../middleware/asyncErrorMiddleware.js";
import errorHandler from "../middleware/errorMiddleware.js";
import { Appointment } from "../models/appointmentScema.js";
import { User } from "../models/userScema.js";

export const newAppointment = asyncerror(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_Date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appointment_Date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !hasVisited ||
    !address
  ) {
    return next(new errorHandler("please fill full form", 400));
  }
  
  const isConflict = await User.find({
    firstName : doctor_firstName,
    lastName : doctor_lastName,
    role : "Doctor",
    doctorDepartment : department
})

if(isConflict.length === 0){
    return next(new errorHandler("doctor not found", 400))
}
if(isConflict.length > 1){
    return next(new errorHandler("doctor conflict! pleace contact with phone or email", 400))
}

const doctorId = isConflict[0]._id
const patientId = req.user._id

const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_Date,
    department,
    doctor:{
        firstName:doctor_firstName,
        lastName:doctor_lastName
    },
    hasVisited,
    address,
    doctorId,
    patientId,
})
res.status(200).json({
    success:true,
    message:"appointment send successfull"
})
});
