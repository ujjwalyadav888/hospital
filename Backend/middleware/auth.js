import { User } from "../models/userScema.js";
import { asyncerror } from "./asyncErrorMiddleware.js";
import errorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken"

export const isAdminAuthenticated = asyncerror(async (req, res, next) => {

    const token = req.cookies.adminToken;
    if (!token) {
        return next(new errorHandler("Admin not authenticated", 400));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return next(new errorHandler("Invalid or expired token", 401));
    }

    req.user = await User.findById(decoded.id);

    if (!req.user || req.user.role !== "Admin") {
        return next(new errorHandler("Not authorized for this resource", 403));
    }

    next();
});

export const isPatientAuthenticated = asyncerror (async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new errorHandler("patient not authenticated",400))
    }
    const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY) 
    req.user=await User.findById(decoded.id)
    if(req.user.role !== "patient"){
        return next(
            new errorHandler(
                `${req.user.role} not authorised for this resource`,
                403
            )
        )
    }
    next();
})