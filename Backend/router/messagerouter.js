import express from "express"
import { messageSend } from "../controler/messagecontroler.js"

const router= express.Router()

router.post("/send",messageSend)

export default router;