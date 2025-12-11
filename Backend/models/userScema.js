import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
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
  }
},
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    password: {
      type: String,
      required: true,
      minLength: [10, "passwoed should contain at least 10 characters"],
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["Doctor", "Admin", "patient"],
    },
    doctorDepartment: {
      type: String,
    },
    docAvtar: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  }
);



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
