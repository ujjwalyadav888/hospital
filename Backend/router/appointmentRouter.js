import express from "express"
import { newAppointment } from "../controler/appointmentControler.js"

const router = express.Router()

router.post("/post",newAppointment)

export default router