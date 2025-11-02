import express, { urlencoded } from "express";
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnect } from "./db/dbconection.js";
import messageRouter from "./router/messagerouter.js"


config({ path: "./config/.config.env" });


const app = express();

app.use(cors({
    origin:
    [process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}))

app.use("/api/v1/message", messageRouter)

dbConnect();

export default app;