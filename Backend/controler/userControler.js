import { genrateToken } from "../utils/jwtToken.js";
import { asyncerror } from "../middleware/asyncErrorMiddleware.js";
import errorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userScema.js";

export const patientRegster = asyncerror(async (req, res, next) => {
  // Check if request body exists
  if (!req.body) {
    return next(new errorHandler("please fill fullform", 400));
  }

  const { firstName, lastName, email, phone, dob, gender, password, role } =
    req.body;

  let user = await User.findOne({ email });
  if (user) {
    return next(new errorHandler("user allready regster", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role,
  });

  res.status(200).json({
    success: true,
    message: "user regster",
  });
});

export const login = asyncerror(async (req, res, next) => {
  if (!req.body) {
    return next(new errorHandler("please fill fullform", 400));
  }

  const { email, password, comformPassword, role } = req.body;

  if (!email || !password || !comformPassword || !role) {
    return next(new errorHandler("please provide all detail", 400));
  }

  if (password !== comformPassword) {
    return next(new errorHandler("please enter right password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorHandler("invalid email and password", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new errorHandler("invalid email and password", 400));
  }

  if (role !== user.role) {
    return next(new errorHandler("user with this role not found", 400));
  }

  // ✅ Only this line sends the response
  genrateToken(user, "user login successfully", 200, res);
});

export const newAdmin = asyncerror(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new errorHandler("Please provide all details", 400));
  }

  const isRegister = await User.findOne({ email });
  if (isRegister) {
    return next(
      new errorHandler(`${isRegister.role} with this email already exists`, 400)
    );
  }

  await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "Admin registered",
  });
});

export const getAllDoctors = asyncerror(async (req, res, next) => {
  const doctor = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctor,
  });
});

export const getUserDetails = asyncerror(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = asyncerror(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin logout successfully",
    });
});

export const logoutPatient = asyncerror(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient logout successfully",
    });
});

export const addNewDoctor = asyncerror(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new errorHandler("Doctor Avatar required", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new errorHandler("file formate not sopported", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(new errorHandler("Please provide all details", 400));
  }

  const isRegister = await User.findOne({ email });
  if (isRegister) {
    return next(
      new errorHandler(
        `${isRegister.role} already registered with this email`,
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(
      "cloudnary Error:",
      cloudinaryResponse.error || "unknown cloudinary error"
    );
  }

  const newDoctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "new Doctor registered",
    newDoctor,
  });
});

