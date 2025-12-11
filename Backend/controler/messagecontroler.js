import { Message } from "../models/messageScema.js";
import { asyncerror } from "../middleware/asyncErrorMiddleware.js";
import errorHandler from "../middleware/errorMiddleware.js"

export const messageSend =asyncerror( async (req, res, next) => {
    const {firstName, lastName, email, phone, message} = req.body;
     if (!firstName || !lastName || !email || !phone || !message){
         return next(new errorHandler("please fill full form",400))
    }
     await Message.create({firstName, lastName, email, phone, message})
     res.status(200).json({
        success:true,
        message:"message send successfully"
     })
})

export const getAllMessage = asyncerror(async (req,res,next)=>{
    const allmessage = await Message.find()
    res.status(200).json({
        success:true,
        message:"all message",
        data: allmessage
     }) 
})
