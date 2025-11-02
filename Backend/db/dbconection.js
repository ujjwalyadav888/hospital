import mongoose from "mongoose";

export const dbConnect=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"hospital_management"
    }).then(()=>{
        console.log("database connected")
    }).catch(err=>{
        console.log(`something went error on database connection: ${err}`);
        
    })
}