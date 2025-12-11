import express from "express"
import { getAllMessage, messageSend } from "../controler/messagecontroler.js"
import { isAdminAuthenticated } from "../middleware/auth.js"
const router= express.Router()

router.post("/send",messageSend)
router.post("/allMessage",isAdminAuthenticated,getAllMessage)

export default router;